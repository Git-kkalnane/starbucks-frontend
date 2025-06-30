// src/services/api.js
import axios from 'axios';
import { starbucksStorage } from '../store/starbucksStorage';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
const API_VERSION = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const api = axios.create({
    baseURL: URL + API_VERSION,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = starbucksStorage.getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
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

export default api;
