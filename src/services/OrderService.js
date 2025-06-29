import axios from 'axios';
import {
    getSizeOptionByName,
    getTemperatureDisplayOption,
    mapTemperatureOption,
} from '../_utils/constants/beverageOptions';
import ItemType from '../_utils/constants/itemType';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
const API_VERSION = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const api = axios.create({
    baseURL: URL + API_VERSION,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * API 응답 데이터를 프론트엔드에 적합한 형식으로 변환합니다.
 * @param {Object} apiData - API 응답 데이터
 * @returns {Array} 변환된 아이템 배열
 */
const transformItemData = (apiData) => {
    if (!apiData?.items) return [];

    return apiData.items.map((item) => ({
        id: item.id,
        koreanName: item.nameKo,
        englishName: item.nameEn,
        price: item.price,
        img: item.iceImageUrl || item.hotImageUrl || item.dessertImageUrl || '',
        itemType: ItemType.fromString(item.type),
    }));
};

/**
 * API 응답을 프론트엔드에서 사용할 음료 상세 데이터로 변환합니다.
 * @param {Object} item - API에서 받은 음료 상세 데이터
 * @returns {Object|null} 변환된 음료 상세 데이터
 */
const transformBeverageDetailData = (item) => {
    if (!item) return null;

    // 지원되는 크기 옵션을 매핑합니다.
    const mapSizeOptions = (sizes = []) => {
        return sizes.map((size) => getSizeOptionByName(size)).filter(Boolean); // 유효한 옵션만 필터링
    };

    // 지원되는 온도 옵션을 매핑하고 필터링합니다.
    const temperatureOptions = (item.supportedTemperatures || [])
        .map((temp) => mapTemperatureOption(temp))
        .filter(Boolean);

    // 기본 온도 표시 옵션을 결정합니다.
    const defaultTemperature = getTemperatureDisplayOption(temperatureOptions);

    return {
        id: item.id,
        koreanName: item.nameKo,
        englishName: item.nameEn,
        description: item.description,
        price: item.price,
        isCoffee: item.isCoffee,
        img: item.imageUrl,
        category: item.category,
        status: item.status,
        sizeOptions: mapSizeOptions(item.supportedSizes),
        temperatureOptions,
        defaultTemperature,
    };
};

const transformDessertDetailData = (item) => {
    if (!item) return null;

    return {
        id: item.id,
        koreanName: item.nameKo,
        englishName: item.nameEn,
        description: item.description,
        price: item.price,
        category: item.category,
        img: item.imageUrl,
    };
};

export const OrderQueryService = {
    async fetchItemDetail(itemId, itemType, options = {}) {
        try {
            let response;
            if (itemType === ItemType.BEVERAGE) {
                response = await api.get(`/items/drinks/${itemId}`, options);
                const _shopData = transformBeverageDetailData(response.data.result || response.data.data);
                console.log('API response shopData: ', _shopData);
                return _shopData;
            } else if (itemType === ItemType.DESSERT) {
                response = await api.get(`/items/desserts/${itemId}`, options);
                const _shopData = transformDessertDetailData(response.data.result || response.data.data);
                console.log('API response shopData: ', _shopData);
                return _shopData;
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
                throw new Error('Request was canceled');
            }
            console.error(`Failed to fetch shop details for itemId ${itemId}:`, error);
            throw error;
        }
    },

    async fetchDrinkItems(page = 0, size = 10, options = {}) {
        try {
            const response = await api.get('/items/drinks', {
                params: { page, size },
                signal: options.signal,
            });

            const paginationData = response.data.pagination || {
                currentPage: page,
                pageSize: size,
                totalCount: response.data.result?.length || 0,
                totalPages: Math.ceil((response.data.result?.length || 0) / size) || 1,
            };

            return {
                items: transformItemData(response.data.result || response.data.data),
                pagination: paginationData,
            };
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
                throw new Error('Request was canceled');
            }
            console.error('Error fetching drink items:', error);
            throw error;
        }
    },

    async fetchBeverageItemDetail(itemId, options = {}) {
        try {
            const response = await api.get(`/items/drinks/${itemId}`, options);
            const _shopData = transformBeverageDetailData(response.data.result || response.data.data);
            console.log('API response shopData: ', _shopData);
            return _shopData;
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
                throw new Error('Request was canceled');
            }
            console.error(`Failed to fetch shop details for itemId ${itemId}:`, error);
            throw error;
        }
    },

    async fetchDessertItems(page = 0, size = 10, options = {}) {
        try {
            const response = await api.get('/items/desserts', {
                params: { page, size },
                signal: options.signal,
            });

            const paginationData = response.data.pagination || {
                currentPage: page,
                pageSize: size,
                totalCount: response.data.result?.length || 0,
                totalPages: Math.ceil((response.data.result?.length || 0) / size) || 1,
            };

            return {
                items: transformItemData(response.data.result || response.data.data),
                pagination: paginationData,
            };
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
                throw new Error('Request was canceled');
            }
            console.error('Error fetching dessert items:', error);
            throw error;
        }
    },

    async fetchDessertItemDetail(itemId, options = {}) {
        try {
            const response = await api.get(`/items/desserts/${itemId}`);
            const transformedData = transformDessertDetailData(response.data.result);
            console.log('Dessert detail data:', transformedData);
            return transformedData;
        } catch (error) {
            console.error(`Failed to fetch dessert details for itemId ${itemId}:`, error);
            throw error;
        }
    },
};
