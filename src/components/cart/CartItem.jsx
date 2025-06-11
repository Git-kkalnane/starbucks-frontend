import React from 'react';

const CartItem = ({ item, isSelected, onToggleSelect, onRemove, onChangeQty, className }) => (
    <div className={`relative flex flex-col bg-white rounded-xl shadow border border-gray-300 ${className}`}>
        <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="accent-blue-500 w-5 h-5 absolute left-4 top-4"
        />
        <button className="text-gray-400 text-2xl absolute right-4 top-1" onClick={onRemove}>
            ×
        </button>
        <div className="flex flex-row items-start pl-6 pr-5 pt-10 pb-3">
            <div className="w-24 h-24 bg-[#f3e6d7] rounded-full flex-shrink-0 mr-5 flex items-center justify-center text-[#c8b7a6] text-lg overflow-hidden">
                <img src={item.img} alt={item.name} className="object-cover w-full h-full" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="font-bold text-[#222] text-base truncate">{item.name}</div>
                <div className="text-xs text-disabled-string mb-1 truncate">{item.eng}</div>
                <div className="flex flex-row items-center justify-between text-sm text-[#a6a6a6] font-medium mb-2">
                    {item.option} <span className="ml-2 ">{item.price}원</span>
                </div>
                <span className="my-4 underline cursor-pointer text-[#98714e] text-sm">옵션 변경</span>
                <div className="my-2 flex flex-row items-center justify-between">
                    <div className="flex items-center justify-center gap-2">
                        <button
                            className="w-6 h-6 rounded-full bg-white text-lg font-bold flex items-center justify-center text-black border-[2px] border-black"
                            onClick={() => onChangeQty(-1)}
                        >
                            -
                        </button>
                        <span className="font-bold text-base w-6 text-center text-[#222]">{item.qty}</span>
                        <button
                            className="w-7 h-7 rounded-full bg-starbucks-green text-lg font-bold flex items-start justify-center text-white border-[2px] border-white"
                            onClick={() => onChangeQty(1)}
                        >
                            +
                        </button>
                    </div>
                    <span className="font-bold text-black text-lg mt-2">
                        {(item.price * item.qty).toLocaleString()}원
                    </span>
                </div>
            </div>
        </div>
    </div>
);

export default CartItem;
