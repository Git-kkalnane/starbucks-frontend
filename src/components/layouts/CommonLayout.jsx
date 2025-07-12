// Layout.js
import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import DebugPanel from '../debug/DebugPanel';
import DebugBtnGroup from '../debug/DebugBtnGroup';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import ActiveOrderBtn from '../common/ActiveOrderBtn';
import './Layout.css'; // 스타일 분리

export default function CommonLayout({ children, className = '' }) {
    const [showDebug, setShowDebug] = useState(false);
    const { state, dispatch } = useUser();
    const navigate = useNavigate();

    const toggleDebug = () => {
        setShowDebug(!showDebug);
    };

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            dispatch({ type: 'LOGOUT' });
            navigate('/login');
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
        }
    };

    const hasActiveOrders = state.activeOrders && state.activeOrders.length > 0;

    return (
        <div className={`layout-container font-[Pretendard] relative ${className}`}>
            {/* Debug and Logout Button Group */}
            <DebugBtnGroup
                isAuthenticated={state.isAuthenticated}
                onToggleDebug={toggleDebug}
                onLogout={handleLogout}
                isDebugOpen={showDebug}
            />
            {/* 디버그 패널 */}
            {showDebug && <DebugPanel state={state} onClose={toggleDebug} />}

            {children}

            {/* 진행중인 주문 플로팅 버튼 - always bottom center */}
            {hasActiveOrders && (
                <div className="md:pl-[var(--nav-width)] fixed bottom-8 left-0 right-0 w-full flex justify-center z-[1200]">
                    <ActiveOrderBtn onClick={() => navigate('/order')} orders={state.activeOrders} />
                </div>
            )}
        </div>
    );
}
