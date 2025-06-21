import { CommonHeader } from '../components/common/customHeader';
import CommonLayout from '../layouts/CommonLayout';
import Logo from '../components/common/Logo';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import useAuthRedirect from '../hooks/useAuthRedirect';
import SignupForm from '../components/signup/SignupForm';

function Signup() {
    const navigate = useNavigate();
    const { state } = useUser();

    // 이미 로그인된 상태면 홈으로 리다이렉트
    useAuthRedirect({
        requireAuth: false,
        redirectTo: '/',
        authState: state,
    });

    return (
        <CommonLayout>
            <CommonHeader title="회원가입" hasBack={true} onBackClick={() => navigate(-1)} />

            <div className="flex flex-col items-center px-6 pt-10">
                <Logo className="mb-8" />
                <SignupForm />
                <div className="mt-10 w-full"></div>
            </div>
        </CommonLayout>
    );
}

export default Signup;
