import React from 'react';
import CommonLayout from '../components/layouts/CommonLayout';
import { ColumnHeader, CommonHeader } from '../components/common/customHeader';
import { Card } from '../components/pay/Card';
import { Link } from 'react-router-dom';

const cardInfo1 = {
    number: '1928-0056-3394-2018',
    balance: 50000,
};

const cardInfo2 = {
    number: '3064-2518-1719-7461',
    balance: 35000,
};

function Pay() {
    return (
        <CommonLayout className="pb-10">
            <ColumnHeader title="Pay" bgColor="white" className="pt-16 shadow-[0_2px_3px_-1px_rgba(0,0,0,0.3)]" />
            <div className="mt-6 sm:mt-12 md:mt-16">
                <Card cardInfo={cardInfo1} />
                <div className="grid mt-14 place-items-center ">
                    <Link to="/charge">
                        <button className="text-lg font-semibold text-[#01A862] border border-[#C0C0C0] rounded-lg px-8 py-4">
                            충전하기
                        </button>
                    </Link>
                </div>
            </div>
        </CommonLayout>
    );
}

export default Pay;
