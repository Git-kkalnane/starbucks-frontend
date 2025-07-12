import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCreditCard, FaShoppingBag, FaEllipsisH } from 'react-icons/fa';

import './Navigation.css';

const Navigation = () => {
    const navItems = [
        { to: '/', icon: <FaHome />, label: 'Home' },
        { to: '/pay', icon: <FaCreditCard />, label: 'Pay' },
        { to: '/order', icon: <FaShoppingBag />, label: 'Order' },
        { to: '/other', icon: <FaEllipsisH />, label: 'Other' },
    ];

    return (
        <>
            <nav className="bottom-nav">
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
