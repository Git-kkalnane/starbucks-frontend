import { CommonBtn } from '../common/customBtn';
import { CommonBtnGroup } from '../common/BtnGroup';
import { CommonText } from '../common/customText';

function AuthPanel({ className = '' }) {
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
                />
                <CommonBtn
                    title="로그인"
                    bgColor="bg-white"
                    textColor="text-starbucks-green"
                    fontSize="text-sm"
                    paddingX="px-[18px]"
                    paddingY="py-[8px]"
                />
            </CommonBtnGroup>
        </section>
    );
}

export default AuthPanel;
