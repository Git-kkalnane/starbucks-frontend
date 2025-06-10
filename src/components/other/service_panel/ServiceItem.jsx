import React from 'react';
import { Link } from 'react-router-dom';

function ServiceItem({
    icon,
    label,
    to = '#', // 이동할 경로
    minW = 'min-w-[104px]',
    maxW = 'max-w-[120px]',
    minH = 'min-h-[104px]',
    maxH = 'max-h-[120px]',
    iconColor = 'text-green-600',
    iconSize = 'w-8 h-8',
    className = '',
}) {
    const styledIcon = React.cloneElement(icon, {
        className: `${icon.props.className || ''} ${iconColor} ${iconSize}`,
    });

    return (
        <Link
            to={to}
            className={`bg-white rounded-xl shadow flex flex-col items-center justify-center 
                        ${minW} ${maxW} ${minH} ${maxH} 
                        hover:shadow-md transition ${className}`}
        >
            <span className="mb-2 text-sm">{styledIcon}</span>
            <span className="text-sm font-bold">{label}</span>
        </Link>
    );
}

export default ServiceItem;
