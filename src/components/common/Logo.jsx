// Logo.jsx
import React from 'react';
import logo from '../../assets/logo.svg';

const Logo = ({ src = logo, alt = 'Logo', className = '' }) => {
    return (
        <div className={`w-24 h-24 rounded-full flex items-center justify-center ${className}`}>
            <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
    );
};

export default Logo;
