import React from 'react';
import { CommonText } from '../../common/customText';

const ShowcaseItem = ({ item, className = '' }) => {
    return (
        <div className="flex flex-col mb-3">
            <div className={`w-full mb-2 rounded-[10px] shadow-md bg-white ${className}`}>
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover rounded-[10px]"
                    style={{ maxHeight: '190px' }}
                />
            </div>
            <div className="">
                <CommonText fontSize="text-base" bold>
                    {item.title}
                </CommonText>
                <CommonText fontSize="text-xs" bold>
                    {item.subtitle}
                </CommonText>
                {/* <h3 className="m-0 mb-1 text-base text-gray-900">{item.title}</h3>
        <p className="m-0 text-xs opacity-90 text-gray-700">{item.subtitle}</p> */}
            </div>
        </div>
    );
};

export default ShowcaseItem;
