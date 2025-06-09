import React from 'react';
import { IoChevronBack } from 'react-icons/io5';

export function CommonHeader({
    title,
    height = 'h-[46px]',
    fontSize = 'text-base',
    hasShadow = false,
    bgColor = '',
    borderBottomColor = '',
    onBack,
    className = '',
}) {
    return (
        <header
            className={`relative flex items-center justify-center px-3 ${height} ${className} ${
                hasShadow ? 'shadow-[0_2px_4px_-1px_rgba(0,0,0,0.1)]' : ''
            }`}
            style={{
                backgroundColor: bgColor || 'transparent',
                borderBottom: borderBottomColor ? `1px solid ${borderBottomColor}` : undefined,
            }}
        >
            {/* 뒤로가기 버튼 */}
            {onBack && (
                <button
                    onClick={onBack}
                    className="absolute left-4 p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                    aria-label="뒤로가기"
                    type="button"
                >
                    {/* 아이콘: 왼쪽 화살표 */}
                    <IoChevronBack size={30} />
                </button>
            )}

            <h1 className={`${fontSize} font-semibold`}>{title}</h1>
        </header>
    );
}

export function ColumnHeader({
    title,
    height = 'h-[103px]',
    fontSize = 'text-4xl',
    hasShadow = false,
    bgColor = '',
    borderBottomColor = '',
    onBack,
    className = '',
}) {
    return (
        <header
            className={`px-3 py-3 ${height} ${className} ${hasShadow ? 'shadow-[0_2px_4px_-1px_rgba(0,0,0,0.1)]' : ''}`}
            style={{
                backgroundColor: bgColor || 'transparent',
                borderBottom: borderBottomColor ? `1px solid ${borderBottomColor}` : undefined,
            }}
        >
            {/* 뒤로가기 버튼 */}
            {onBack && (
                <button
                    onClick={onBack}
                    className="mb-2 text-gray-500 hover:text-gray-900 focus:outline-none"
                    aria-label="뒤로가기"
                    type="button"
                >
                    <IoChevronBack size={30} />
                </button>
            )}

            {/* 왼쪽 정렬된 제목 */}
            <p className={`${fontSize} font-semibold text-left pl-2`}>{title}</p>
        </header>
    );
}
