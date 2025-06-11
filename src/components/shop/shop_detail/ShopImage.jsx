import React from 'react';
import { CommonText } from '../../common/customText';

const ShopImage = ({ image, name, className }) => {
    return (
        <div className={`w-full aspect-square bg-gray-100 flex items-center justify-center ${className}`}>
            {image ? (
                <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
                <CommonText className="text-gray-400">이미지 준비 중</CommonText>
            )}
        </div>
    );
};

export default ShopImage;
