import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import AuthService from '../../services/AuthService';
import DebugButton from './DebugButton';

const DevTools = ({ onToggleDebug, showDebug, debugState }) => {
    const navigate = useNavigate();
    const { state, dispatch } = useUser();

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
        <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50">
            {state.isAuthenticated && (
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
                    title="로그아웃"
                    aria-label="로그아웃"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            )}
            <DebugButton onClick={onToggleDebug} />
        </div>
    );
};

export default DevTools;
