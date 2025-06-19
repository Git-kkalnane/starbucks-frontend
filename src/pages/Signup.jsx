import { useNavigate } from 'react-router-dom';
import { CommonHeader } from '../components/common/customHeader';
import CommonLayout from '../layouts/CommonLayout';
import Logo from '../components/common/Logo';
import { CommonTextInput } from '../components/common/TextInput';
import { CommonBtn } from '../components/common/customBtn';
import { useState } from 'react';
import useAuthRedirect from '../hooks/useAuthRedirect';
import { useUser } from '../contexts/UserContext';

function Signup() {
    const navigate = useNavigate();
    const { state } = useUser();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 이미 로그인된 상태면 홈으로 리다이렉트
    useAuthRedirect({
        requireAuth: false, // 로그인 페이지는 인증이 필요 없음
        redirectTo: '/',
        authState: state,
    });

    return (
        <CommonLayout>
            <CommonHeader title="회원가입" hasBack={true} onBackClick={() => navigate(-1)} />

            <div className="flex flex-col items-center px-6 pt-10">
                {/* Logo Placeholder */}
                <Logo className="mb-8" />

                <form className="w-full">
                    <CommonTextInput
                        placeholder="이름"
                        containerClassName="mb-4"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />

                    <CommonTextInput
                        placeholder="이메일"
                        containerClassName="mb-4"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <CommonTextInput
                        placeholder="비밀번호 (8자 이상)"
                        containerClassName="mb-4"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <CommonTextInput
                        placeholder="비밀번호 확인"
                        containerClassName="mb-4"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    <div className="flex items-center pt-2">
                        <input
                            type="checkbox"
                            id="terms"
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                            이용약관 및 개인정보 수집에 동의합니다.
                        </label>
                    </div>

                    <div className="pt-6">
                        <CommonBtn
                            title="가입하기"
                            bgColor="bg-green-600"
                            textColor="text-white"
                            fullWidth={true}
                            className="mb-4"
                        />
                    </div>
                </form>

                <div className="mt-10 w-full"></div>
            </div>
        </CommonLayout>
    );
}

export default Signup;
