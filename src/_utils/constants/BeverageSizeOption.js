/**
 * 음료 크기 옵션을 정의한 Enum
 * @readonly
 * @enum {{name: string, price: number, label: string, ml: number}}
 */
export const BeverageSizeOption = Object.freeze({
    /** 톨 (Tall) - 355ml */
    TALL: {
        name: 'TALL',
        price: 0,
        label: '톨',
        ml: 355
    },
    
    /** 그란데 (Grande) - 473ml */
    GRANDE: {
        name: 'GRANDE',
        price: 500,
        label: '그란데',
        ml: 473
    },
    
    /** 벤티 (Venti) - 591ml */
    VENTI: {
        name: 'VENTI',
        price: 500,
        label: '벤티',
        ml: 591
    },
    
    /** 숏 (Short) - 236ml */
    SHORT: {
        name: 'SHORT',
        price: 0,
        label: '숏',
        ml: 236
    },
    
    /** 솔로 (Solo) - 89ml */
    SOLO: {
        name: 'SOLO',
        price: 0,
        label: '솔로',
        ml: 89
    },
    
    /** 도피오 (Doppio) - 89ml */
    DOPPIO: {
        name: 'DOPPIO',
        price: 0,
        label: '도피오',
        ml: 89
    }
});

/**
 * 크기 옵션을 이름으로 조회합니다.
 * @param {string} name - 조회할 크기 옵션의 이름 (대소문자 구분 없음)
 * @returns {Object|undefined} 크기 옵션 객체 (없는 경우 undefined)
 */
export const getSizeOptionByName = (name) => {
    if (!name) return undefined;
    const upperName = name.toUpperCase();
    return Object.values(BeverageSizeOption).find(size => size.name === upperName);
};

export default BeverageSizeOption;
