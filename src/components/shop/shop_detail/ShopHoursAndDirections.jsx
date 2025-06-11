import React from 'react';
import { CommonText } from '../../common/customText';

const ShopHoursAndDirections = ({ businessHours, direction, className }) => {
    return (
        <div className={`${className}`}>
            <div className="mb-4">
                <CommonText fontSize="xs" className="text-gray-500 font-medium mb-1">
                    운영 시간
                </CommonText>
                <CommonText fontSize="sm" className="text-gray-800">
                    {businessHours}
                </CommonText>
            </div>

            <div>
                <CommonText fontSize="xs" className="text-gray-500 font-medium mb-1">
                    오시는 길
                </CommonText>
                <CommonText fontSize="sm" className="text-gray-800">
                    {direction}
                </CommonText>
            </div>
        </div>
    );
};

export default ShopHoursAndDirections;
