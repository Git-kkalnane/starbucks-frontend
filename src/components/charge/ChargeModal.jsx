import { useState } from 'react';

export const ChargeModal = ({ isModalOpen, setIsModalOpen, setSelectedUnit, modifyCustomUnitValue }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const isButtonEnabled = value.trim() !== '';

    return (
        <div>
            {isModalOpen && (
                <div className="md:pl-[var(--nav-width)] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className=" max-w-[512px] md:w-1/2 sm:w-5/6 pt-6 bg-white rounded-lg shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="px-6 mb-4 text-lg font-semibold">1만원부터 55만원 까지 충전할 수 있어요</h2>
                        <div className="relative px-6 my-8 group">
                            <label
                                htmlFor="myInput"
                                className="absolute text-xs text-black transition-all duration-200 opacity-0 -top-5 group-focus-within:opacity-100"
                            >
                                충전 금액
                            </label>
                            <div className="relative">
                                <input
                                    id="myInput"
                                    type="text"
                                    value={value}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border-b border-[#E0E0E0] focus:outline-none focus:border-[#00A862] inline pl-0"
                                    placeholder="충전 금액(1만원 단위)"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#686868]">
                                    만원
                                </span>
                            </div>
                        </div>
                        <button
                            name="cancel-btn"
                            onClick={() => {
                                setSelectedUnit(10000);
                                setIsModalOpen(false);
                            }}
                            className="w-1/2 px-4 py-4 font-semibold text-black border rounded-bl-lg"
                        >
                            취소
                        </button>
                        <button
                            name="confirm-btn"
                            onClick={() => {
                                setSelectedUnit(Number(value) * 10000);
                                modifyCustomUnitValue(Number(value) * 10000);
                                setIsModalOpen(false);
                            }}
                            disabled={!isButtonEnabled}
                            className={`w-1/2 px-4 py-4 font-semibold border rounded-br-lg text-[#00A862] disabled:text-[#C0C0C0]`}
                        >
                            충전하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
