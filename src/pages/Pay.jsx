import React from 'react';
import CommonLayout from '../layouts/CommonLayout';
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
        <CommonLayout>
            <ColumnHeader
                title="Pay"
                height="h-32"
                bgColor="white"
                className="pt-20 shadow-[0_2px_3px_-1px_rgba(0,0,0,0.3)]"
            />
            <div className="mt-12 sm:mt-20 md:mt-30">
                <Card cardInfo={cardInfo1} />
                <div className="grid mt-14 place-items-center">
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
