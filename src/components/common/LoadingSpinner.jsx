import React from 'react';

function LoadingSpinner({ message = '로딩 중...', loadingColor = 'gray-300', className = '', spinnerClassName = '' }) {
    return (
        <div className={`flex flex-col justify-center items-center py-20 ${className}`}>
            <div
                className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-${loadingColor} ${spinnerClassName}`}
            ></div>
            {message && <span className="mt-4 text-gray-600">{message}</span>}
        </div>
    );
}

export default LoadingSpinner;
