/**
 * 음료 온도 옵션을 정의한 Enum
 * @readonly
 * @enum {string}
 */
export const BeverageTemperatureOption = Object.freeze({
    /** 아이스 음료 (ICE) */
    ICE: 'ICE',

    /** 핫 음료 (HOT) */
    HOT: 'HOT',

    /** 아이스 전용 음료 (ICE_ONLY) */
    ICE_ONLY: 'ICE_ONLY',

    /** 핫 전용 음료 (HOT_ONLY) */
    HOT_ONLY: 'HOT_ONLY',
});

/**
 * 온도 표시 옵션
 * @readonly
 * @enum {string}
 */
export const TemperatureDisplayOption = Object.freeze({
    /** 핫 전용 */
    HOT_ONLY: 'Hot only',

    /** 아이스 전용 */
    ICE_ONLY: 'Ice only',

    /** 핫/아이스 선택 가능 */
    HOT_OR_ICE: 'Hot/Ice',
});

/**
 * 온도 옵션 배열을 바탕으로 표시할 온도 옵션을 결정합니다.
 * @param {Array<string>} temperatureOptions - BeverageTemperatureOption 배열
 * @returns {string} TemperatureDisplayOption 값
 */
export const getTemperatureDisplayOption = (temperatureOptions = []) => {
    const hasHot = temperatureOptions.includes(BeverageTemperatureOption.HOT) || 
                  temperatureOptions.includes(BeverageTemperatureOption.HOT_ONLY);
    const hasIce = temperatureOptions.includes(BeverageTemperatureOption.ICE) || 
                  temperatureOptions.includes(BeverageTemperatureOption.ICE_ONLY);

    if (hasHot && !hasIce) {
        return TemperatureDisplayOption.HOT_ONLY;
    } else if (!hasHot && hasIce) {
        return TemperatureDisplayOption.ICE_ONLY;
    } else if (temperatureOptions.includes(BeverageTemperatureOption.HOT_ONLY)) {
        return TemperatureDisplayOption.HOT_ONLY;
    } else if (temperatureOptions.includes(BeverageTemperatureOption.ICE_ONLY)) {
        return TemperatureDisplayOption.ICE_ONLY;
    }
    
    return TemperatureDisplayOption.HOT_OR_ICE;
};

/**
 * API 응답의 온도 문자열을 BeverageTemperatureOption으로 변환합니다.
 * @param {string} temp - API 응답의 온도 문자열
 * @returns {string|null} BeverageTemperatureOption 값 또는 null
 */
export const mapTemperatureOption = (temp) => {
    const upperTemp = temp?.toUpperCase();
    switch (upperTemp) {
        case 'HOT':
            return BeverageTemperatureOption.HOT;
        case 'ICE':
            return BeverageTemperatureOption.ICE;
        case 'HOT_ONLY':
            return BeverageTemperatureOption.HOT_ONLY;
        case 'ICE_ONLY':
            return BeverageTemperatureOption.ICE_ONLY;
        default:
            return null;
    }
};

// /**
//  * 온도 옵션의 라벨을 반환합니다.
//  * @param {string} temperature - 온도 옵션
//  * @returns {string} 온도 옵션의 라벨
//  */
// export const getTemperatureLabel = (temperature) => {
//     const labels = {
//         [BeverageTemperatureOption.ICE]: '아이스',
//         [BeverageTemperatureOption.HOT]: '핫',
//         [BeverageTemperatureOption.ICE_ONLY]: '아이스 전용',
//         [BeverageTemperatureOption.HOT_ONLY]: '핫 전용'
//     };

//     return labels[temperature] || temperature;
// };

export default BeverageTemperatureOption;
