import { useNavigate } from 'react-router-dom';
import { CommonBtn } from '../common/customBtn';
import { CommonText } from '../common/customText';
import { CommonBtnGroup } from '../common/BtnGroup';
import { useUser } from '../../contexts/UserContext';

function AuthPanel({ className = '' }) {
    const navigate = useNavigate();
    const {
        state: { isAuthenticated, user },
    } = useUser();

    if (isAuthenticated && user) {
        return (
            <section className={` pb-4 px-7 ${className}`}>
                <div className="flex items-center justify-between  rounded-lg">
                    <div className="flex items-center">
                        <div>
                            <CommonText fontSize="text-lg" bold className="text-black">
                                {user.nickname || '고객'}님,
                            </CommonText>
                            <CommonText fontSize="text-lg" bold className="text-black mt-1">
                                오늘도 스타벅스를 찾아주셔서 감사합니다.
                            </CommonText>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={`pt-5 pb-4 px-7 ${className}`}>
            <CommonText fontSize="text-xl" bold>
                스타벅스에 오신것을 환영합니다!
            </CommonText>

            <CommonBtnGroup gap="gap-6" padding="px-7">
                <CommonBtn
                    title="로그인"
                    bgColor="bg-white"
                    textColor="text-[#006241]"
                    hoverOpacity="hover:opacity-90"
                    fullWidth={true}
                    onClick={() => navigate('/login')}
                />

                <CommonBtn
                    title="회원가입"
                    bgColor="bg-[#006241]"
                    textColor="text-white"
                    hoverOpacity="hover:opacity-90"
                    fullWidth={true}
                    onClick={() => navigate('/signup')}
                />
            </CommonBtnGroup>
        </section>
    );
}

export default AuthPanel;
