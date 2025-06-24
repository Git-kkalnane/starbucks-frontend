import React from 'react';

// Sub-component for the quantity control buttons
const QuantityControl = ({ quantity, onDecrease, onIncrease }) => (
    <div className="flex items-center justify-center gap-2">
        <button
            onClick={onDecrease}
            className="w-6 h-6 rounded-full bg-white text-lg font-bold flex items-center justify-center text-black border-2 border-black"
            aria-label="수량 줄이기"
        >
            -
        </button>
        <span className="font-bold text-base w-6 text-center text-[#222]">{quantity}</span>
        <button
            onClick={onIncrease}
            className="w-7 h-7 rounded-full bg-starbucks-green text-lg font-bold flex items-center justify-center text-white border-2 border-white"
            aria-label="수량 늘리기"
        >
            +
        </button>
    </div>
);

// Sub-component for the item image
const ItemImage = ({ src, alt }) => (
    <div className="w-24 h-24 bg-[#f3e6d7] rounded-full flex-shrink-0 mr-5 flex items-center justify-center text-[#c8b7a6] text-lg overflow-hidden">
        <img
            src={src}
            alt={alt}
            className="object-cover w-full h-full"
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-item.png';
            }}
        />
    </div>
);

// Sub-component for the item info
const ItemInfo = ({ koreanName, englishName, option, totalPrice }) => (
    <div className="flex-1 min-w-0">
        <h3 className="font-bold text-[#222] text-base truncate">{koreanName}</h3>
        <p className="text-xs text-disabled-string mb-1 truncate">{englishName}</p>
        <div className="flex flex-row items-center justify-between text-sm text-[#a6a6a6] font-medium mb-2">
            {option}
            <span className="ml-2">{totalPrice.toLocaleString()}원</span>
        </div>
        <button
            className="my-4 underline cursor-pointer text-[#98714e] text-sm hover:text-[#7a5c3d] transition-colors"
            onClick={() => {
                /* 옵션 변경 로직 */
            }}
        >
            옵션 변경
        </button>
    </div>
);

// Main CartItem component
const CartItem = ({ item, isSelected, onToggleSelect, onRemove, onChangeQty, className = '' }) => {
    const handleQuantityChange = (delta) => {
        onChangeQty(delta);
    };

    return (
        <div className={`relative flex flex-col bg-white rounded-xl shadow border border-gray-300 ${className}`}>
            {/* Selection checkbox */}
            <input
                type="checkbox"
                checked={isSelected}
                onChange={onToggleSelect}
                className="accent-blue-500 w-5 h-5 absolute left-4 top-4 cursor-pointer"
                aria-label={`${item.item.koreanName} 선택`}
            />

            {/* Remove button */}
            <button
                className="text-gray-400 text-2xl absolute right-4 top-1 hover:text-gray-600 transition-colors"
                onClick={onRemove}
                aria-label="상품 삭제"
            >
                ×
            </button>

            {/* Item content */}
            <div className="flex flex-row items-start pl-6 pr-5 pt-10 pb-3">
                <ItemImage src={item.img} alt={item.item.koreanName} />

                <div className="flex-1">
                    <ItemInfo
                        koreanName={item.item.koreanName}
                        englishName={item.item.englishName}
                        option={item.temperatureOption + ' | ' + item.cupSize}
                        totalPrice={item.totalPrice}
                    />

                    <div className="my-2 flex flex-row items-center justify-between">
                        <div className="flex items-center">
                            <QuantityControl
                                quantity={item.quantity}
                                onDecrease={() => handleQuantityChange(-1)}
                                onIncrease={() => handleQuantityChange(1)}
                            />
                        </div>
                        <span className="font-bold text-black text-lg">
                            {(item.totalPrice * item.quantity).toLocaleString()}원
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
