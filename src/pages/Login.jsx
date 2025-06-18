import { useNavigate } from 'react-router-dom';
import { CommonBtn } from '../components/common/customBtn';
import CommonLayout from '../layouts/CommonLayout';
import Greeting from '../components/login/Greeting';
import { CommonTextInput } from '../components/common/TextInput';
import { useState } from 'react';
import { ColumnHeader } from '../components/common/customHeader';
import AccountOptions from '../components/login/AccountOption';
import { useUser } from '../contexts/UserContext';
import AuthService from '../services/AuthService';
import useAuthRedirect from '../hooks/useAuthRedirect';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { state, actions } = useUser();
    // 이미 로그인된 상태면 홈으로 리다이렉트
    useAuthRedirect({
        requireAuth: false, // 로그인 페이지는 인증이 필요 없음
        redirectTo: '/',
        authState: state,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            setError('');
            setIsLoading(true);

            // 로그인 시도 (UserContext의 login 액션을 사용)
            const success = await actions.login(email, password);

            if (success) {
                // 로그인 성공 시 홈으로 리다이렉트
                navigate('/');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    // 소셜 로그인 핸들러
    const handleSocialLogin = async (provider) => {
        try {
            // 소셜 로그인 URL로 리다이렉트
            window.location.href = `${
                process.env.REACT_APP_API_URL || 'http://localhost:8080'
            }/oauth2/authorization/${provider}`;
        } catch (err) {
            console.error('Social login error:', err);
            setError('소셜 로그인 중 오류가 발생했습니다.');
        }
    };

    return (
        <CommonLayout>
            <ColumnHeader title="로그인" hasBack={true} onBack={() => window.history.back()} className="mb-[20px]" />

            <div className="flex flex-col items-center px-6 ">
                <Greeting className="mb-[80px]" />

                {/* 로그인 폼 */}
                <form className="w-full" onSubmit={handleSubmit}>
                    {/* 에러 메시지 표시 */}
                    {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">{error}</div>}

                    <CommonTextInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="이메일을 입력해 주세요"
                        containerClassName="mb-4"
                        required
                    />
                    <CommonTextInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="비밀번호를 입력해 주세요"
                        containerClassName="mt-4"
                        required
                    />

                    {/* 아이디 저장 & 아이디/비밀번호 찾기 */}
                    <AccountOptions onFindAccountClick={() => navigate('/find-account')} />

                    <CommonBtn
                        type="submit"
                        title={isLoading ? '로그인 중...' : '로그인'}
                        bgColor="bg-starbucks-green"
                        textColor="text-white"
                        fullWidth={true}
                        className="mt-12 mb-2"
                        disabled={isLoading}
                    />
                    <CommonBtn
                        title="회원가입"
                        bgColor="bg-white"
                        textColor="text-starbucks-green"
                        borderColor="border-starbucks-green"
                        fullWidth={true}
                        onClick={() => navigate('/signup')}
                    />
                </form>
            </div>
        </CommonLayout>
    );
}

export default Login;
