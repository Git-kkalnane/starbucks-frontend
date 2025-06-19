import React from 'react';
import DebugButton from './DebugButton';

const DebugBtnGroup = ({ 
    isAuthenticated, 
    onToggleDebug, 
    onLogout,
    isDebugOpen 
}) => {
    return (
        <div className="fixed bottom-4 right-4 flex flex-col space-y-3 z-50">
            {/* Debug Button */}
            <div className="flex justify-end">
                <DebugButton 
                    onClick={onToggleDebug} 
                    title={isDebugOpen ? 'Close Debug Panel' : 'Open Debug Panel'}
                    color="bg-blue-500 hover:bg-blue-600"
                />
            </div>
            
            {/* Logout Button */}
            {isAuthenticated && (
                <div className="flex justify-end">
                    <DebugButton 
                        onClick={onLogout} 
                        title="Logout" 
                        color="bg-red-500 hover:bg-red-600"
                        icon={
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-6 w-6" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                                />
                            </svg>
                        }
                    />
                </div>
            )}
        </div>
    );
};

export default DebugBtnGroup;
