import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { CommonText } from '../common/customText';

const OrderTrackerIntro = ({ shopName, title, subtitle, className = '' }) => {
    const navigate = useNavigate();

    const onClose = () => {
        navigate('/');
    };

    return (
        <section className={`flex-shrink-0 ${className}`}>
            <article className="flex justify-between items-center px-2 pt-2">
                <div></div>
                <button onClick={onClose} className="p-2">
                    <IoClose className="w-7 h-7" />
                </button>
            </article>
            <article className="w-full h-12"></article> {/* 공백 */}
            <article className="px-5">
                <CommonText fontSize="text-base" className="text-starbucks-green mb-1">
                    {shopName}
                </CommonText>
                <CommonText fontSize="text-xl" weight="font-bold" className="mb-1">
                    {title}
                </CommonText>
                <CommonText fontSize="text-base" className="text-gray-500 mb-1 whitespace-pre-wrap">
                    {subtitle}
                </CommonText>
            </article>
        </section>
    );
};

export default OrderTrackerIntro;
