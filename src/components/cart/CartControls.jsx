import React from 'react';

const ShoppingCartControls = ({ isAllSelected, onToggleAll, onRemoveSelected, onRemoveAll, className }) => (
    <div className={`flex items-center justify-between  ${className}`}>
        <div className="flex items-center gap-2">
            <input type="checkbox" checked={isAllSelected} onChange={onToggleAll} className="accent-blue-500 w-5 h-5" />
            <span className="text-lg font-bold text-[#222]">주문 메뉴</span>
        </div>
        <div className="flex gap-3 text-sm items-center">
            <button className="text-[#59b36c] font-semibold" onClick={onRemoveSelected}>
                선택삭제
            </button>
            <span className="text-[#e6dcd2]">|</span>
            <button className="text-[#b4b4b4]" onClick={onRemoveAll}>
                전체삭제
            </button>
        </div>
    </div>
);

export default ShoppingCartControls;
