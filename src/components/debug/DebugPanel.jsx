import React from 'react';

const DebugPanel = ({ state, onClose }) => {
    return (
        <div className="fixed bottom-20 right-4 bg-white p-4 rounded-lg shadow-xl z-50 max-w-xs max-h-96 overflow-auto">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">사용자 상태</h3>
                <button 
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="닫기"
                >
                    ✕
                </button>
            </div>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                {JSON.stringify(state, null, 2)}
            </pre>
        </div>
    );
};

export default DebugPanel;
