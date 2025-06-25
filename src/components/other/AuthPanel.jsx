import { useNavigate } from 'react-router-dom';
import { CommonBtn } from '../common/customBtn';
import { CommonBtnGroup } from '../common/BtnGroup';
import { CommonText } from '../common/customText';
import { useUser } from '../../contexts/UserContext';

function AuthPanel({ className = '' }) {
    const navigate = useNavigate();
    const {
        state: { isAuthenticated, user },
    } = useUser();

    if (isAuthenticated && user) {
        return (
            <section className={`bg-white px-6 py-2 ${className}`}>
                <div className="flex flex-col items-center space-y-2">
                    <div className="text-3xl font-bold tracking-wider">
                        <span className="text-starbucks-green">{user.nickname || '고객'}</span>
                        <span className="text-black">{` 님`}</span>
                    </div>
                    <span className="text-black text-3xl font-bold tracking-wider">환영합니다!</span>
                </div>
            </section>
        );
    }

    return (
        <section className={`bg-white rounded-2xl shadow px-6 py-5 ${className}`}>
            <CommonText children="로그인하시면 서비스 이용이 가능해요." fontSize="text-lg" bold={true} />

            <CommonBtnGroup justify="justify-end" gap="gap-2" padding="px-0" className="w-full mt-5">
                <CommonBtn
                    title="회원가입"
                    bgColor="bg-starbucks-green"
                    textColor="text-white"
                    fontSize="text-sm"
                    paddingX="px-[18px]"
                    paddingY="py-[8px]"
                    onClick={() => navigate('/signup')}
                />
                <CommonBtn
                    title="로그인"
                    bgColor="bg-white"
                    textColor="text-starbucks-green"
                    fontSize="text-sm"
                    paddingX="px-[18px]"
                    paddingY="py-[8px]"
                    borderColor="border border-starbucks-green"
                    onClick={() => navigate('/login')}
                />
            </CommonBtnGroup>
        </section>
    );
}

export default AuthPanel;
