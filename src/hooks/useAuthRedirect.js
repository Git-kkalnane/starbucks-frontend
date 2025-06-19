import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 인증 상태에 따라 리다이렉션을 처리하는 커스텀 훅
 * @param {Object} options - 옵션 객체
 * @param {boolean} options.requireAuth - 인증이 필요한지 여부 (기본값: true)
 * @param {string} [options.redirectTo] - 리다이렉션할 경로 (기본값: '/')
 * @param {Object} authState - 인증 상태 객체
 * @param {boolean} authState.isAuthenticated - 인증 여부
 * @param {boolean} authState.loading - 로딩 상태
 */
const useAuthRedirect = ({
    requireAuth = true,
    redirectTo = '/',
    authState = { isAuthenticated: false, loading: true }
} = {}) => {
    const navigate = useNavigate();
    const { isAuthenticated, loading } = authState;

    useEffect(() => {
        // 로딩 중이면 아무것도 하지 않음
        if (loading) return;

        // 인증이 필요한 페이지인데 인증되지 않은 경우
        if (requireAuth && !isAuthenticated) {
            navigate('/login', { state: { from: redirectTo }, replace: true });
        }
        // 인증이 필요없는 페이지(로그인, 회원가입 등)인데 이미 인증된 경우
        else if (!requireAuth && isAuthenticated) {
            navigate(redirectTo, { replace: true });
        }
    }, [isAuthenticated, loading, navigate, redirectTo, requireAuth]);

    return { isAuthenticated, loading };
};

export default useAuthRedirect;
