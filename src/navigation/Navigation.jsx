import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaMoneyBillWave, FaCoffee, FaEllipsisH, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import './Navigation.css';

const Navigation = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navItems = [
        { to: '/', icon: <FaHome />, label: 'Home' },
        { to: '/pay', icon: <FaMoneyBillWave />, label: 'Pay' },
        { to: '/order', icon: <FaCoffee />, label: 'Order' },
        { to: '/other', icon: <FaEllipsisH />, label: 'Other' },
    ];

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            <nav className={`bottom-nav ${isCollapsed ? 'collapsed' : ''}`}>
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

                {/* 화면 사이즈 sm이면 버튼 사라짐 */}
                <button
                    className="collapse-btn"
                    onClick={toggleCollapse}
                    aria-label={isCollapsed ? 'Expand menu' : 'Collapse menu'}
                >
                    {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
                </button>
            </nav>
        </>
    );
};

export default Navigation;
