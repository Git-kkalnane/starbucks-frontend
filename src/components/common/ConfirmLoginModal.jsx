import React from 'react';

const ConfirmLoginModal = ({ open, onConfirm, onCancel }) => {
    if (!open) return null;
    return (
        <div className="md:pl-[var(--nav-width)] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
                className="max-w-[400px] w-11/12 md:w-[400px] min-h-[240px] bg-white rounded-2xl shadow-xl flex flex-col justify-center items-center p-6 md:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full text-center mb-10 md:mb-12">
                    <div className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
                        로그인이 필요한 서비스입니다.
                    </div>
                    <div className="text-gray-600 text-base md:text-lg">로그인 화면으로 이동할까요?</div>
                </div>
                <div className="flex justify-center gap-4 w-full px-2">
                    <button
                        className="flex-1 max-w-[140px] py-3 md:py-4 rounded-xl bg-[#006241] text-white font-semibold 
                        hover:bg-[#004d34] transition-all duration-200 text-sm md:text-base"
                        onClick={onConfirm}
                    >
                        네
                    </button>
                    <button
                        className="flex-1 max-w-[140px] py-3 md:py-4 rounded-xl border border-gray-300 text-gray-700 font-medium 
                        hover:bg-gray-50 transition-all duration-200 text-sm md:text-base"
                        onClick={onCancel}
                    >
                        아니요
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmLoginModal;
