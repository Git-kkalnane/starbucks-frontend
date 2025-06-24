import { useState } from 'react';
import { CommonHeader } from '../../components/common/customHeader';
import CommonLayout from '../../components/layouts/CommonLayout';
import { CommonText } from '../../components/common/customText';
import ForwardSVG from '../../assets/icons/forward-icon.svg?react';
import { Link } from 'react-router-dom';

function Account() {
    const [accountInfo, setAccountInfo] = useState({
        userName: '홍길동',
        email: 'user0123@gmail.com',
        nickName: '사용자닉네임',
    });

    return (
        <CommonLayout>
            <CommonHeader
                title="개인정보 관리"
                onBack={() => window.history.back()}
                className="shadow-[0_2px_3px_-1px_rgba(0,0,0,0.3)]"
            />
            <div className="mx-8">
                <UnModifiableInfo dataInfo="이름" data={accountInfo.userName} />
                <UnModifiableInfo dataInfo="이메일" data={accountInfo.email} />
                <ModifiableArea dataInfo="닉네임" data={accountInfo.nickName} URI="/account/nickname" />
                <ModifiableArea
                    dataInfo="비밀번호"
                    data="비밀번호 변경"
                    URI="/account/password"
                    style="text-[#98714E] underline"
                />
            </div>
        </CommonLayout>
    );
}

const UnModifiableInfo = ({ dataInfo, data }) => {
    return (
        <div className="pt-5 pb-2 border-b border-[#EAEAEA]">
            <CommonText fontSize="text-xl" weight="font-semibold" className="mb-2 text-[#8C8C8C]">
                {dataInfo}
            </CommonText>
            <CommonText fontSize="text-lg" weight="font-medium" className="text-[#8C8C8C]">
                {data}
            </CommonText>
        </div>
    );
};

const ModifiableArea = ({ dataInfo, data, URI, style }) => {
    return (
        <div className="py-6 border-b border-[#EAEAEA] flex items-center justify-between">
            <CommonText className="inline" fontSize="text-xl" weight="font-semibold">
                {dataInfo}
            </CommonText>
            <div>
                <Link to={URI}>
                    <CommonText className={`inline text-sm ${style}`}>{data}</CommonText>
                    <ForwardSVG className="inline ml-1" />
                </Link>
            </div>
        </div>
    );
};

export default Account;
