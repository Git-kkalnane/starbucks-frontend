import { useNavigate } from 'react-router-dom';
import { CommonBtn } from '../components/common/customBtn';
import CommonLayout from '../layouts/CommonLayout';
import Greeting from '../components/login/Greeting';
import { CommonTextInput } from '../components/common/TextInput';
import { useState } from 'react';
import { ColumnHeader } from '../components/common/customHeader';
import AccountOptions from '../components/login/AccountOption';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <CommonLayout>
            <ColumnHeader title="로그인" hasBack={true} onBack={() => window.history.back()} className="mb-[20px]" />

            <div className="flex flex-col items-center px-6 ">
                <Greeting className="mb-[80px]" />

                {/* 로그인 폼 */}
                <form className="w-full">
                    <CommonTextInput
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="아이디를 입력해 주세요"
                        containerClassName="mb-4"
                    />
                    <CommonTextInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="비밀번호를 입력해 주세요"
                        containerClassName="mt-4"
                    />
                    {/* 아이디 저장 & 아이디/비밀번호 찾기, TODO 있어야 할지 고민 */}
                    <AccountOptions onFindAccountClick={() => navigate('/find-account')} />

                    <CommonBtn
                        title="로그인"
                        bgColor="bg-starbucks-green"
                        textColor="text-white"
                        fullWidth={true}
                        className="mt-12 mb-2"
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
