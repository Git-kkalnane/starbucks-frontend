import axios from 'axios';
import { starbucksStorage } from '../store/starbucksStorage';
import api from './api';

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

            const authHeader = response.headers['authorization'];
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new Error('No access token found in response');
            }
            const accessToken = authHeader.split(' ')[1];

            const userData = response.data?.result;
            if (!userData) {
                throw new Error('No user data in response');
            }

            AuthService.setAuthToken(accessToken);
            AuthService.setUserInfo(userData);

            return userData;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    },

    // 로그아웃 - 프론트엔드에서만 세션 및 토큰 제거
    async logout() {
        try {
            // 브라우저에 저장한 세션 및 토큰 제거
            AuthService.clearAuth();
            // 로그인 페이지로 리다이렉트
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    },

    // 회원가입
    async signup(userData) {
        try {
            const response = await api.post('/members/signup', userData);

            if (response.data?.status !== 201) {
                throw new Error(response.data?.message || '회원가입에 실패했습니다.');
            }

            const userInfo = response.data?.result;
            if (!userInfo) {
                throw new Error('서버로부터 유효한 응답을 받지 못했습니다.');
            }

            // 회원가입 성공 메시지와 함께 사용자 정보 반환
            return {
                success: true,
                message: response.data.message,
                user: userInfo,
            };
        } catch (error) {
            console.error('Signup failed:', error);
            throw error;
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
