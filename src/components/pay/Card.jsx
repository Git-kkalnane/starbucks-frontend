import { QRCodeSVG } from 'qrcode.react';
import { CommonText } from '../common/customText';

export const Card = ({ cardInfo }) => {
    return (
        <div className="grid place-items-center">
            <img src="images/card.png" alt="카드 이미지" className="w-3/4" />
            <div className="mt-10">
                <CommonText className="card-balance" fontSize="text-3xl" weight="font-semibold">
                    {cardInfo.balance.toLocaleString()}원
                </CommonText>
            </div>
            <div className="mt-10">
                <QRCodeSVG value={cardInfo.number} />
            </div>
            <div className="mt-8">
                <CommonText className="card-number" fontSize="text-lg" weight="font-medium">
                    {cardInfo.number}
                </CommonText>
            </div>
        </div>
    );
};
