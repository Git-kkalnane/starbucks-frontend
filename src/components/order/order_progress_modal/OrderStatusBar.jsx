import React from 'react';

export default function OrderStatusBar() {
  return (
    <div className="flex px-6 pt-3 pb-2 gap-2">
      <div className="flex-1 text-center">
        <div className="text-sm font-medium text-starbucks-green">주문 완료</div>
        <div className="h-1 mt-1 rounded-full bg-starbucks-green"></div>
      </div>
      <div className="flex-1 text-center">
        <div className="text-sm font-medium text-starbucks-green">준비 중</div>
        <div className="h-1 mt-1 rounded-full bg-starbucks-green"></div>
      </div>
      <div className="flex-1 text-center">
        <div className="text-sm font-medium text-gray-300">준비 완료</div>
        <div className="h-1 mt-1 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
}
