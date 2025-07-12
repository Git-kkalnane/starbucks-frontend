import React from 'react';

export default function OrderReceiptBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-4 pb-2">
      <div className="text-base font-semibold text-gray-900">주문내역 (1)</div>
      <button className="text-xs font-medium text-gray-500 border border-gray-200 rounded-lg px-3 py-1">
        영수증 보기
      </button>
    </div>
  );
}
