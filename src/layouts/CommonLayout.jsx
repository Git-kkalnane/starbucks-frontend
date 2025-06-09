// Layout.js
import React from 'react';
import './Layout.css'; // 스타일 분리

export default function CommonLayout({ children }) {
    return <div className="layout-container">{children}</div>;
}
