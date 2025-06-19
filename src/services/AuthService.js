import axios from 'axios';

// TODO env 설정로 변경 예정
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

// 기본 axios 인스턴스 생성
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // httpOnly 쿠키를 위해 필요
});

// 요청 인터셉터: 토큰이 있으면 헤더에 추가
api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// 응답 인터셉터: 401 에러 처리
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 401 에러이고, 재시도한 요청이 아닌 경우
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 리프레시 토큰으로 액세스 토큰 갱신 시도
                const response = await api.post(
                    '/auth/refresh-token',
                    {},
                    {
                        withCredentials: true, // httpOnly 쿠키를 위해 필요
                    },
                );

                const { accessToken } = response.data;
                sessionStorage.setItem('accessToken', accessToken);

                // 원래 요청을 새로운 토큰으로 재시도
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (error) {
                // 리프레시 토큰도 만료된 경우 로그아웃 처리
                AuthService.clearAuth();
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    },
);

const AuthService = {
    // 토큰 저장
    setAuthToken(token) {
        if (token) {
            sessionStorage.setItem('accessToken', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    },

    setUserInfo(user) {
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
        }
    },

    // 인증 정보 초기화
    clearAuth() {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('user');
        delete api.defaults.headers.common['Authorization'];

        // 로그아웃 API 호출 (백엔드에서 리프레시 토큰 무효화)
        api.post('/auth/logout').catch((error) => {
            console.error('로그아웃 중 오류 발생:', error);
        });
    },

    // 리프레시 토큰으로 액세스 토큰 갱신
    async refreshAccessToken() {
        try {
            const response = await api.post('/auth/refresh-token');
            const { accessToken } = response.data;

            if (accessToken) {
                AuthService.setAuthToken(accessToken);
                return accessToken;
            }
            return null;
        } catch (error) {
            console.error('토큰 갱신 실패:', error);
            AuthService.clearAuth();
            window.location.href = '/login';
            throw error;
        }
    },

    async login(email, password) {
        try {
            const response = await api.post('/auth/login', {
                email,
                password,
            });

            console.log('Login response:', response);

            const { accessToken, user } = response.data.data;

            if (accessToken && user) {
                // 액세스 토큰은 메모리나 세션 스토리지에 저장
                AuthService.setAuthToken(accessToken);
                AuthService.setUserInfo(user);
                return { user, accessToken };
            }

            throw new Error('Invalid response from server');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    },

    // 로그아웃 - 프론트엔드에서만 세션 및 토큰 제거
    async logout() {
        try {
            // 브라우저에 저장한 세션 및 토큰 제거
            this.clearAuth();
            // 로그인 페이지로 리다이렉트
            window.location.href = '/';
        } catch (error) {
            console.error('로그아웃 처리 중 오류:', error);
            // 오류가 발생해도 사용자 정보는 클리어
            this.clearAuth();
            window.location.href = '/';
        }
    },

    // TODO 프론트에서 토큰 유효성 검사 로직을 구현할 것인지 생각
    // 토큰 유효성 검사
    async validateToken() {
        const token = sessionStorage.getItem('accessToken');
        if (!token) return false;

        try {
            // 토큰 유효성 검사 (만료 시간 확인)
            const payload = JSON.parse(atob(token.split('.')[1]));
            const isTokenValid = payload.exp * 1000 > Date.now();

            // 토큰이 유효하면 true 반환
            if (isTokenValid) return true;

            // 토큰이 만료되었으면 리프레시 토큰으로 갱신 시도
            const newToken = await this.refreshAccessToken();
            return !!newToken;
        } catch (error) {
            console.error('토큰 검증 실패:', error);
            return false;
        }
    },
};

export default AuthService;
