import React from 'react';
import { NavLink } from 'react-router-dom';

function StoreSelectionBanner({ title, to = '/order/shop', className }) {
    return (
        <section className={`px-5 py-3 bg-[#2E2926] ${className}`}>
            <NavLink key={to} to={to} className="border-b-[1px] border-[#474240] flex items-center justify-between">
                <span className="text-[#fff] text-sm">{title}</span>
                <span className="text-[#fff] font-bold cursor-pointer text-xs">▼</span>
            </NavLink>
        </section>
    );
}

export default StoreSelectionBanner;
