import React from 'react';
import { CommonText } from '../../common/customText';
import { RiCupLine } from 'react-icons/ri';

const CupSizeSelector = ({ cupSize, setCupSize, cupSizes, iconSize = 'w-6 h-6' }) => {
    return (
        <section className="my-8">
            <CommonText fontSize="text-xl" bold={true} className="mb-5">
                컵 선택
            </CommonText>
            <div className="flex justify-between gap-2">
                {cupSizes.map((size) => (
                    <button
                        key={size.id}
                        onClick={() => setCupSize(size.id)}
                        className={`flex-1 flex flex-col items-center p-3 rounded-lg border-2 ${
                            cupSize === size.id ? 'border-green-600 bg-green-50' : 'border-gray-200'
                        }`}
                    >
                        <article className="flex items-center justify-center w-10 h-10">
                            <RiCupLine className={`${size.iconSize || iconSize} mb-2 text-black`} />
                        </article>

                        <span className="font-medium">{size.name}</span>
                        <span className="text-sm text-gray-500">{size.volume}</span>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default CupSizeSelector;
