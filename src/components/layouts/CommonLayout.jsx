// Layout.js
import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import DebugPanel from '../debug/DebugPanel';
import DebugBtnGroup from '../debug/DebugBtnGroup';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
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
        </div>
    );
}
