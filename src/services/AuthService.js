import axios from 'axios';
import { starbucksStorage } from '../_utils/starbucksStorage';

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
                starbucksStorage.setAccessToken(accessToken);

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
            starbucksStorage.setAccessToken(token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    },

    setUserInfo(user) {
        if (user) {
            starbucksStorage.setUser(user);
        }
    },

    // 인증 정보 초기화
    clearAuth() {
        starbucksStorage.clearAll();
        delete api.defaults.headers.common['Authorization'];

        // TODO 로그아웃 API 호출 (백엔드에서 리프레시 토큰만 무효화)
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
                return user;
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

    // 현재 사용자 정보 가져오기
    async getCurrentUser() {
        try {
            const response = await api.get('/auth/user');
            const user = response.data;
            return user;
        } catch (error) {
            console.error('Failed to get current user:', error);
            return null;
        }
    },
};

export default AuthService;
