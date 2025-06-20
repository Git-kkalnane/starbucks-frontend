import React from 'react';

/**
 * 재사용 가능한 확인 모달
 * @param {Object} props
 * @param {boolean} props.open - 모달이 열려있는지 여부
 * @param {string} props.title - 모달의 주제
 * @param {string} props.subtitle - 모달의 부제
 * @param {Function} props.onConfirm - 확인 버튼이 클릭되었을 때 호출되는 함수
 * @param {Function} props.onCancel - 취소 버튼이 클릭되었을 때 호출되는 함수
 * @param {string} [props.confirmText='네'] - 확인 버튼의 텍스트
 * @param {string} [props.cancelText='아니오'] - 취소 버튼의 텍스트
 * @param {string} [props.confirmButtonClass='bg-[#006241] hover:bg-[#004d34] text-white'] - 확인 버튼의 추가 클래스
 * @param {string} [props.cancelButtonClass='border border-gray-300 text-gray-700 hover:bg-gray-50'] - 취소 버튼의 추가 클래스
 */
const ConfirmationModal = ({
    open,
    title,
    subtitle,
    onConfirm,
    onCancel,
    confirmText = '네',
    cancelText = '아니오',
    confirmButtonClass = 'bg-[#006241] hover:bg-[#004d34] text-white',
    cancelButtonClass = 'border border-gray-300 text-gray-700 hover:bg-gray-50',
}) => {
    if (!open) return null;

    return (
        <div className="md:pl-[var(--nav-width)] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
                className="max-w-[400px] w-11/12 md:w-[400px] min-h-[240px] bg-white rounded-2xl shadow-xl flex flex-col justify-center items-center p-6 md:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full text-center mb-10 md:mb-12">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">{title}</h2>
                    {subtitle && <p className="text-gray-600 text-base md:text-lg">{subtitle}</p>}
                </div>
                <div className="flex justify-center gap-4 w-full px-2">
                    <button
                        className={`flex-1 max-w-[140px] py-3 md:py-4 rounded-xl font-semibold transition-all duration-200 text-sm md:text-base ${confirmButtonClass}`}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                    <button
                        className={`flex-1 max-w-[140px] py-3 md:py-4 rounded-xl font-medium transition-all duration-200 text-sm md:text-base ${cancelButtonClass}`}
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
