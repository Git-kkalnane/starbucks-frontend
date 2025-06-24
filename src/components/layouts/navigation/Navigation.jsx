import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import HomeSVG from '../../../assets/icons/home.svg?react';
import PaySVG from '../../../assets/icons/pay.svg?react';
import OrderSVG from '../../../assets/icons/order.svg?react';
import OtherSVG from '../../../assets/icons/other.svg?react';

import './Navigation.css';

const Navigation = () => {
    const navItems = [
        { to: '/', icon: <HomeSVG />, label: 'Home' },
        { to: '/pay', icon: <PaySVG />, label: 'Pay' },
        { to: '/order', icon: <OrderSVG />, label: 'Order' },
        { to: '/other', icon: <OtherSVG />, label: 'Other' },
    ];

    return (
        <>
            <nav className={`bottom-nav`}>
                <div className="nav-logo">
                    <h2>Starbucks</h2>
                </div>

                <div className="nav-menu">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>
        </>
    );
};

export default Navigation;
