import React from 'react';
import { useNavigate } from 'react-router-dom';
import CommonLayout from '../components/layouts/CommonLayout';
import { CommonBtn } from '../components/common/customBtn';

function NotFound() {
    const navigate = useNavigate();

    return (
        <CommonLayout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9f9f9] px-4">
                <div className="text-center max-w-md">
                    <h1 className="text-9xl font-black text-starbucks-green mb-2">404</h1>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">페이지를 찾을 수 없습니다</h2>
                    <p className="text-gray-600 mb-8">
                        요청하신 페이지가 존재하지 않거나,
                        <br />
                        다른 주소로 이동했을 수 있습니다.
                    </p>
                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
                        <CommonBtn
                            onClick={() => navigate(-1)}
                            title="이전 페이지로"
                            className="border border-black hover:bg-[#1e3932] text-black"
                        />
                        <CommonBtn
                            onClick={() => navigate('/')}
                            title="홈으로 가기"
                            bgColor="bg-starbucks-green"
                            textColor="text-white"
                            hoverOpacity="hover:opacity-90"
                            fontSize="text-sm"
                            paddingX="px-6"
                            paddingY="py-3"
                        />
                    </div>
                </div>
                <div className="mt-12 text-center">
                    <p className="text-sm text-gray-500">문제가 계속되면 고객센터로 문의해주세요</p>
                </div>
            </div>
        </CommonLayout>
    );
}

export default NotFound;
