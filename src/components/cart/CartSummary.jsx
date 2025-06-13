import React from 'react';

function CartSummary({ selectedCount, totalQty, totalPrice, onOrder, className }) {
    return (
        <div className={`mt-2 px-5 pb-6 ${className}`}>
            <div className="flex justify-between items-end mb-2 text-base">
                <span className="font-semibold text-[#987142]">
                    총 <span className="text-[#59b36c]">{selectedCount}</span>개 / {totalQty}개
                </span>
                <span className="font-bold text-2xl text-[#222]">{totalPrice.toLocaleString()}원</span>
            </div>
            <button
                className={`w-full py-4 rounded-2xl font-bold text-lg mt-2 ${
                    selectedCount === 0
                        ? 'bg-deactivation text-gray-100'
                        : 'bg-starbucks-green text-white hover:bg-[#a97d4a]'
                }`}
                disabled={selectedCount === 0}
                onClick={onOrder}
            >
                주문하기
            </button>
        </div>
    );
}

export default CartSummary;
