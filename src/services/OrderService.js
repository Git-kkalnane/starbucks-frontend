import axios from 'axios';

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

const transformDrinkData = (data) => {
    return data.results.map((page) => {
        const properties = page.properties;
        return {
            id: properties['음료ID']?.number ?? 0,
            koreanName: properties['이름']?.title?.[0]?.plain_text ?? '',
            englishName: properties['영문 이름']?.rich_text?.[0]?.plain_text ?? '',
            category: properties['카테고리']?.select?.name ?? '',
            price: properties['가격']?.number ?? 0,
            description: properties['설명']?.rich_text?.[0]?.plain_text ?? '',
            isIce: properties['ice?']?.select?.name === 'Ice',
            isCoffee: properties['원두 사용?']?.select?.name === 'Yes',
            size: properties['컵크기']?.select?.name ?? '',
            options: properties['옵션']?.multi_select?.map((option) => option.name) ?? [],
            img: {
                hot: properties['hot URL']?.rich_text?.[0]?.plain_text ?? '',
                cold: properties['ice URL']?.rich_text?.[0]?.plain_text ?? '',
            },
        };
    });
};
const transformDessertData = (data) => {
    return data.results.map((page) => {
        const properties = page.properties;
        return {
            id: properties['푸드ID']?.number ?? 0,
            koreanName: properties['이름']?.title?.[0]?.plain_text ?? '',
            englishName: properties['영문 이름']?.rich_text?.[0]?.plain_text ?? '',
            category: properties['카테고리']?.select?.name ?? '',
            price: properties['가격']?.number ?? 0,
            description: properties['메뉴 설명']?.rich_text?.[0]?.plain_text ?? '',
            quantity: properties['수량']?.number ?? 0,
            customerStatus: properties['상태(손님 창)']?.formula?.string ?? '',
            ownerStatus: properties['상태(오너)']?.formula?.string ?? '',
            img: properties['img URL']?.rich_text?.[0]?.plain_text ?? '',
        };
    });
};

export const orderService = {
    // TODO: 서버 개발 후 로직 변경 예정 (임시로 notion API사용)
    async fetchDrinkItems() {
        try {
            const response = await axios.post(
                '/api/drinks/v1/databases/215f1eb21fb18087b1b0ef786107a759/query',
                {},
                { headers: { 'Content-Type': 'application/json' } },
            );
            return transformDrinkData(response.data);
        } catch (error) {
            console.error('Failed to fetch drinks:', error);
            throw error;
        }
    },
    // TODO: 서버 개발 후 로직 변경 예정 (임시로 notion API사용)
    async fetchDessertItems() {
        try {
            const response = await axios.post(
                '/api/desserts/v1/databases/215f1eb21fb18031a88fc7362e70d34a/query',
                {},
                { headers: { 'Content-Type': 'application/json' } },
            );
            return transformDessertData(response.data);
        } catch (error) {
            console.error('Failed to fetch desserts:', error);
            throw error;
        }
    },
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
