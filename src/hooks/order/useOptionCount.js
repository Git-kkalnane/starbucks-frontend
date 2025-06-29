import { useState, useEffect, useMemo } from 'react';

/**
 * 옵션 수량 관리와 계산을 위한 커스텀 훅
 * @param {Array} initialOptions - id와 price를 가진 옵션 객체 배열
 * @param {number} defaultCount - 옵션의 기본 수량 (기본값: 2)
 * @returns {Object} - 옵션 상태와 유틸리티 함수들을 포함한 객체
 */
export const useOptionCount = (initialOptions = [], defaultCount = 2) => {
    // initialOptions가 항상 배열인지 확인
    const safeInitialOptions = useMemo(() => {
        if (!Array.isArray(initialOptions)) {
            console.error('initialOptions must be an array');
            return [];
        }
        return initialOptions;
    }, [initialOptions]);

    // 기본값(0)으로 옵션 상태 초기화
    const [options, setOptions] = useState(
        safeInitialOptions.reduce(
            (acc, option) => ({
                ...acc,
                [option.id]: 0,
            }),
            {},
        ),
    );

    // 바닐라 옵션이 존재하면 기본 수량 설정
    useEffect(() => {
        const vanillaOption = safeInitialOptions.find(opt => opt.id === 'vanilla');
        if (vanillaOption) {
            setOptions(prev => ({
                ...prev,
                vanilla: defaultCount,
            }));
        }
    }, [defaultCount, safeInitialOptions]);

    /**
     * 특정 옵션의 수량을 업데이트합니다.
     * @param {string|number} optionId - 업데이트할 옵션의 ID
     * @param {number} delta - 변경할 수량 (양수 또는 음수)
     */
    const updateOptions = (optionId, delta) => {
        if (typeof optionId === 'undefined' || optionId === null) {
            console.error('Option ID is required');
            return;
        }

        const currentValue = options[optionId] || 0;
        const newValue = currentValue + delta;

        // 새로운 값 검증 (0-5 범위)
        if (newValue >= 0 && newValue <= 5) {
            setOptions(prev => ({
                ...prev,
                [optionId]: newValue,
            }));
        }
    };

    /**
     * 선택된 모든 옵션의 총 가격을 계산합니다.
     * @returns {number} - 모든 옵션의 총 가격
     */
    const calculateOptionsTotal = () => {
        return safeInitialOptions.reduce((sum, option) => {
            const optionPrice = typeof option.price === 'number' ? option.price : 0;
            const optionCount = typeof options[option.id] === 'number' ? options[option.id] : 0;
            return sum + optionCount * optionPrice;
        }, 0);
    };

    return {
        options,
        updateOptions,
        calculateOptionsTotal,
    };
};

export default useOptionCount;
