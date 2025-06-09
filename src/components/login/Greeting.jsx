import { CommonText } from '../common/customText';
import Logo from '../common/Logo';

function Greeting({ className = '' }) {
    return (
        <section className={`w-full ${className}`}>
            <Logo className="mb-4" />

            <CommonText fontSize="text-2xl" bold>
                안녕하세요.
            </CommonText>

            <CommonText fontSize="text-2xl" bold>
                스타벅스입니다.
            </CommonText>

            <CommonText fontSize="text-base" className="text-gray-400">
                회원 서비스 이용을 위해 로그인을 해주세요.
            </CommonText>
        </section>
    );
}

export default Greeting;
