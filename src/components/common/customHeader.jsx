import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import BackSVG from '../../assets/icons/back.svg?react';

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
            className={`relative flex items-center justify-center ${height} ${className} ${
                hasShadow ? 'shadow-[0_2px_4px_-1px_rgba(0,0,0,0.1)]' : ''
            }`}
            style={{
                backgroundColor: bgColor || 'transparent',
                borderBottom: borderBottomColor ? `1px solid ${borderBottomColor}` : undefined,
            }}
        >
            {/* 뒤로가기 버튼 */}
            {onBack && (
                <div className="absolute left-2 flex items-center">
                    <button
                        onClick={onBack}
                        className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900 focus:outline-none overflow-visible"
                        style={{ margin: '-0.25rem' }}
                        aria-label="뒤로가기"
                        type="button"
                    >
                        <BackSVG className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* 가운데 제목 */}
            <h1 className={`${fontSize} font-semibold text-center`}>{title}</h1>
        </header>
    );
}

export function ColumnHeader({
    title,
    height = 'h-[103px]',
    fontSize = 'text-4xl',
    hasShadow = false,
    bgColor = '',
    textColor = '',
    borderBottomColor = '',
    onBack,
    className = '',
}) {
    return (
        <header
            className={`px-3 py-3 flex flex-col ${height} ${className} ${
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
                    className="mb-2 text-gray-500 hover:text-gray-900 focus:outline-none"
                    aria-label="뒤로가기"
                    type="button"
                >
                    <span className="w-[20px] h-[20px] flex items-center">
                        <BackSVG fill={textColor} />
                    </span>
                </button>
            )}

            {/* 왼쪽 정렬된 제목 */}
            <p className={`text-[${textColor}] ${fontSize} font-semibold text-left pl-2`}>{title}</p>
        </header>
    );
}
