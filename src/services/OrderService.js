import axios from 'axios';
import {
    getSizeOptionByName,
    getTemperatureDisplayOption,
    mapTemperatureOption,
} from '../_utils/constants/beverageOptions';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
const API_VERSION = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const api = axios.create({
    baseURL: URL + API_VERSION,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Transform drink data to match frontend data structure
const transformBeverageData = (apiData) => {
    if (!apiData?.items) return [];

    return apiData.items.map((item) => ({
        id: item.id,
        koreanName: item.nameKo,
        englishName: item.nameEn,
        price: item.price,
        img: item.iceImageUrl || item.hotImageUrl || '',
        sizeOptions: item.sizeOption || [],
        temperatureOptions: item.temperatureOption || [],
        shotOptions: item.shotOption || [],
    }));
};

/**
 * API 응답을 프론트엔드에서 사용할 음료 상세 데이터로 변환합니다.
 * @param {Object} item - API에서 받은 음료 상세 데이터
 * @returns {Object|null} 변환된 음료 상세 데이터
 */
const transformBeverageDetailData = (item) => {
    if (!item) return null;

    // 지원되는 크기 옵션 매핑
    const mapSizeOptions = (sizes = []) => {
        return sizes.map((size) => getSizeOptionByName(size)).filter(Boolean); // 유효한 옵션만 필터링
    };

    // 지원되는 온도 옵션 매핑 및 필터링
    const temperatureOptions = (item.supportedTemperatures || [])
        .map((temp) => mapTemperatureOption(temp))
        .filter(Boolean);

    // 기본 온도 표시 옵션 결정
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
        // 백엔드에서 추가 정보가 오면 여기에 매핑
        ...(item.nutritionInfo && { nutritionInfo: item.nutritionInfo }),
        ...(item.allergens && { allergens: item.allergens }),
    };
};

export const OrderQueryService = {
    async fetchDrinkItems(page = 0, size = 10) {
        try {
            const response = await api.get('/items/drinks', {
                params: { page, size },
            });

            // Transform the API response
            const transformedData = transformBeverageData(response.data.result);

            // Return both the transformed items and pagination info
            return {
                items: transformedData,
                pagination: {
                    totalCount: response.data.result.totalCount,
                    currentPage: response.data.result.currentPage,
                    totalPages: response.data.result.totalPages,
                    pageSize: response.data.result.pageSize,
                },
            };
        } catch (error) {
            console.error('Failed to fetch drinks:', error);
            throw error;
        }
    },

    async fetchBeverageItemDetail(itemId) {
        try {
            const response = await api.get(`/items/drinks/${itemId}`);
            const _shopData = transformBeverageDetailData(response.data.result || response.data.data);
            console.log('API response shopData: ', _shopData);
            return _shopData;
        } catch (error) {
            console.error(`Failed to fetch shop details for itemId ${itemId}:`, error);
            throw error;
        }
    },
    async fetchDessertItems(page = 0, size = 10) {
        try {
            const response = await api.get('/items/desserts', {
                params: { page, size },
            });

            // Transform the API response
            const transformedData = transformBeverageData(response.data.result);

            // Return both the transformed items and pagination info
            return {
                items: transformedData,
                pagination: {
                    totalCount: response.data.result.totalCount,
                    currentPage: response.data.result.currentPage,
                    totalPages: response.data.result.totalPages,
                    pageSize: response.data.result.pageSize,
                },
            };
        } catch (error) {
            console.error('Failed to fetch desserts:', error);
            throw error;
        }
    },
};
