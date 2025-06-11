// Layout.js
import React from 'react';
import './Layout.css'; // 스타일 분리

export default function CommonLayout({ children, className = '' }) {
    return <div className={`layout-container font-[Pretendard] ${className}`}>{children}</div>;
}
