/**
 * 메뉴 데이터를 관리하는 서비스 모듈
 */

/**
 * 음료 메뉴 데이터를 반환합니다.
 * @returns {Array} 음료 메뉴 배열
 */
const getDrinkItems = () => {
    return [
        {
            id: 1,
            koreanName: '아이스 플랫 화이트',
            englishName: 'Iced Flat White',
            price: 5800,
        },
        {
            id: 2,
            koreanName: '아이스 카페 아메리카노',
            englishName: 'Iced Cafe Americano',
            price: 4700,
        },
        {
            id: 3,
            koreanName: '아이스 카페 라떼',
            englishName: 'Iced Cafe Latte',
            price: 5200,
        },
        {
            id: 4,
            koreanName: '아이스 스타벅스 돌체 라떼',
            englishName: 'Iced Starbucks Dolce Latte',
            price: 6100,
        },
        {
            id: 5,
            koreanName: '아이스 카페 모카',
            englishName: 'Iced Cafe Mocha',
            price: 5700,
        },
    ];
};

/**
 * 푸드 메뉴 데이터를 반환합니다.
 * @returns {Array} 푸드 메뉴 배열
 */
const getFoodItems = () => {
    return [
        {
            id: 1,
            koreanName: '베이컨 치즈 토스트',
            englishName: 'Bacon Cheese Toast',
            price: 5500,
        },
        {
            id: 2,
            koreanName: '크로크무슈',
            englishName: 'Croque Monsieur',
            price: 5900,
        },
        {
            id: 3,
            koreanName: '에그마요 샌드위치',
            englishName: 'Egg Mayo Sandwich',
            price: 5200,
        },
    ];
};

/**
 * 모든 메뉴 데이터를 객체로 반환합니다.
 * @returns {Object} { drinkItems, foodItems }를 포함한 객체
 */
const getAllMenuItems = () => {
    return {
        drinkItems: getDrinkItems(),
        foodItems: getFoodItems(),
    };
};

export { getDrinkItems, getFoodItems, getAllMenuItems };
