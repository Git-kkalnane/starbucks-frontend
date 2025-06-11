import React from 'react';
import { CommonText } from '../../common/customText';

const ShopBasicInfo = ({ name, address, className }) => {
    return (
        <div className={` ${className}`}>
            <CommonText fontSize="lg" bold className="text-able-string mb-1">
                {name}
            </CommonText>
            <CommonText fontSize="sm" className="text-gray-800">
                {address}
            </CommonText>
        </div>
    );
};

export default ShopBasicInfo;
