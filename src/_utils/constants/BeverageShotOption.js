/**
 * 음료 샷 옵션을 정의한 Enum
 * @readonly
 * @enum {{name: string, price: number, label: string, shotCount: number}}
 */
export const BeverageShotOption = Object.freeze({
    /** 샷 추가 안함 (0샷) */
    NO_SHOT: {
        name: 'NO_SHOT',
        price: 0,
        label: '기본',
        shotCount: 0
    },
    
    /** 샷 추가 (1샷) */
    SHOT: {
        name: 'SHOT',
        price: 500,
        label: '1샷 추가',
        shotCount: 1
    },
    
    /** 더블 샷 (2샷) */
    DOUBLE_SHOT: {
        name: 'DOUBLE_SHOT',
        price: 1000,
        label: '2샷 추가',
        shotCount: 2
    },
    
    /** 트리플 샷 (3샷) */
    TRIPLE_SHOT: {
        name: 'TRIPLE_SHOT',
        price: 1500,
        label: '3샷 추가',
        shotCount: 3
    }
});

/**
 * 샷 옵션을 이름으로 조회합니다.
 * @param {string} name - 조회할 샷 옵션의 이름 (대소문자 구분 없음)
 * @returns {Object|undefined} 샷 옵션 객체 (없는 경우 undefined)
 */
export const getShotOptionByName = (name) => {
    if (!name) return undefined;
    const upperName = name.toUpperCase();
    return Object.values(BeverageShotOption).find(shot => shot.name === upperName);
};

/**
 * 샷 수에 해당하는 옵션을 반환합니다.
 * @param {number} count - 샷 수 (0~3)
 * @returns {Object} 해당하는 샷 옵션 (없는 경우 NO_SHOT 반환)
 */
export const getShotOptionByCount = (count) => {
    return Object.values(BeverageShotOption).find(shot => shot.shotCount === count) || BeverageShotOption.NO_SHOT;
};

export default BeverageShotOption;
