import React from 'react';

function ServiceItem({
    icon,
    label,
    minW = 'min-w-[104px]',
    maxW = 'max-w-[120px]',
    minH = 'min-h-[104px]',
    maxH = 'max-h-[120px]',
    iconColor = 'text-green-600', // 아이콘 색상 기본값
    iconSize = 'w-8 h-8', // 아이콘 크기 기본값
    className = '',
}) {
    // 아이콘에 스타일 적용 (SVG icon 사용시 필요)
    const styledIcon = React.cloneElement(icon, {
        className: `${icon.props.className || ''} ${iconColor} ${iconSize}`,
    });

    return (
        <div
            className={`bg-white rounded-xl shadow flex flex-col items-center justify-center 
                        ${minW} ${maxW} ${minH} ${maxH} 
                        hover:shadow-md transition ${className}`}
        >
            <span className="mb-2 text-sm">{styledIcon}</span>
            <span className="text-sm font-bold">{label}</span>
        </div>
    );
}
export default ServiceItem;
