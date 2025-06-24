import React from 'react';
import { CommonHeader } from '../../common/customHeader';

const MenuHeader = ({ imageUrl, name, onBack, className }) => {
    return (
        <div className={`relative w-full aspect-[4/3] ${className}`}>
            <div className="absolute inset-0">
                <img src={imageUrl} alt={name} className="w-full h-full object-cover" loading="eager" />
            </div>
            <CommonHeader
                onBack={onBack}
                iconColor="white"
                iconSize="w-8 h-8"
                className="absolute top-0 left-0 right-0 z-10"
            />
        </div>
    );
};

export default MenuHeader;
