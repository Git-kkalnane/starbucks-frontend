import axios from 'axios';
import {
    getSizeOptionByName,
    getTemperatureDisplayOption,
    mapTemperatureOption,
} from '../_utils/constants/beverageOptions';
import ItemType from '../_utils/constants/itemType';
import { validateRequestOrderData } from '../_utils/validators';
import api from './api';
import { BeverageTemperatureOption } from '../_utils/constants/beverageOptions';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
const API_VERSION = import.meta.env.VITE_API_BASE_URL || '/api/v1';

/**
 * API 응답 데이터를 프론트엔드에 적합한 형식으로 변환합니다.
 * @param {Object} apiData - API 응답 데이터
 * @returns {Array} 변환된 아이템 배열
 */
const transformItemData = (apiData) => {
    if (!apiData?.items) return [];
    console.log('transformItemData: ', apiData);

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
// 새로운 음료 목록 변환 함수: beverages 배열을 프론트에서 사용하기 좋게 변환
export const transformBeverageList = (beverages = []) => {
    return beverages.map(transformBeverageDetail);
};

// 새로운 음료 상세 변환 함수: 단일 음료 객체 변환
export const transformBeverageDetail = (item) => {
    if (!item) return null;
    // supportedSizes는 [{name, price, volume}] 구조
    const sizeOptions = (item.supportedSizes || []).map((size) => ({
        name: size.name,
        price: size.price,
        volume: size.volume,
    }));
    // supportedTemperatures는 문자열 또는 배열로 올 수 있음
    let temperatureOptions = [];
    let defaultTemperature = '';
    if (item.supportedTemperatures == 'HOT_ICE') {
        temperatureOptions = [BeverageTemperatureOption.HOT, BeverageTemperatureOption.ICE];

        defaultTemperature = BeverageTemperatureOption.HOT;
    } else if (typeof item.supportedTemperatures === 'string') {
        temperatureOptions = [item.supportedTemperatures];
    }
    return {
        defaultImg: item.iceImageUrl || item.hotImageUrl || item.dessertImageUrl || '',
        id: item.id,
        koreanName: item.nameKo,
        englishName: item.nameEn,
        description: item.description,
        price: item.price,
        isCoffee: item.isCoffee,
        img: { hot: item.hotImageUrl, ice: item.iceImageUrl },
        shotName: item.shotName,
        sizeOptions,
        temperatureOptions,
        defaultTemperature,
        itemType: ItemType.BEVERAGE,
    };
};

// 기존 transformBeverageDetailData는 더 이상 사용하지 않음 (호환성 위해 남겨둠, 추후 삭제 가능)
// const transformBeverageDetailData = (item) => { ... }

const transformDessertDetailData = (item) => {
    if (!item) return null;

    return {
        id: item.id,
        koreanName: item.dessertItemNameKo,
        englishName: item.dessertItemNameEn,
        description: item.description,
        price: item.price,
        category: item.category,
        defaultImg: item.imageUrl,
        itemType: ItemType.DESSERT,
    };
};

export const OrderQueryService = {
    async fetchItemDetail(itemId, itemType, options = {}) {
        try {
            console.log('Fetching item itemType', itemType);
            let response;
            if (itemType === ItemType.BEVERAGE) {
                response = await api.get(`/items/drinks/${itemId}`, options);
                console.log('API response beverageData: ', response.data);
                const beverageData = transformBeverageDetail(
                    response.data.result.beverageInfo || response.data.data.beverageInfo,
                );
                return beverageData;
            } else if (itemType === ItemType.DESSERT) {
                response = await api.get(`/items/desserts/${itemId}`, options);
                const _shopData = transformDessertDetailData(response.data.result || response.data.data);
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
                totalCount: response.data.result?.beverages?.length || 0,
                totalPages: Math.ceil((response.data.result?.beverages?.length || 0) / size) || 1,
            };

            const items = transformBeverageList(response.data.result.beverages || []);
            return {
                items,
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
            const beverageData = transformBeverageDetail(response.data.result || response.data.data);
            return beverageData;
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

            const items = response.data.result.desserts.map((item) => transformDessertDetailData(item));

            return {
                items,
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

    async fetchCurrentOrder(options = {}) {
        try {
            const response = await api.get(`/orders/me/current`, options);
            // const transformedData = transformDessertDetailData(response.data.result);
            console.log('Current order data:', response.data);
            return response.data.result;
        } catch (error) {
            console.error(`Failed to fetch current order:`, error);
            throw error;
        }
    },
    async fetchCurrentOrderDetail(orderId, options = {}) {
        try {
            const response = await api.get(`/orders/${orderId}`, options);
            console.log('Current order detail data:', response.data);
            return response.data.result;
        } catch (error) {
            console.error('Failed to fetch current order detail:', error);
            throw error;
        }
    },
};

export const OrderCommandService = {
    /**
     * 주문을 생성하는 API를 호출합니다.
     * @param {Object} orderData - 주문 데이터
     * @param {number} orderData.storeId - 매장 ID
     * @param {string} orderData.pickupType - 픽업 타입 (예: 'STORE_PICKUP')
     * @param {number} orderData.orderTotalPrice - 주문 총 금액
     * @param {string} orderData.orderStatus - 주문 상태 (예: 'PLACED')
     * @param {Array} orderData.orderItems - 주문 항목 배열
     * @returns {Promise<Object>} 생성된 주문 정보
     * @throws {Error} 유효성 검사 실패 시 에러를 던집니다.
     */
    async createOrder(orderData, options = {}) {
        try {
            // 주문 데이터 유효성 검사
            console.log('Order data:', orderData);

            validateRequestOrderData(orderData);
            // console.log('Order data:', orderData);

            const response = await api.post('/orders', orderData);
            console.log('Order created successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to create order:', error);

            // 에러 메시지 추출
            let errorMessage = '주문 생성 중 오류가 발생했습니다.';
            if (error.response) {
                // 서버에서 응답이 왔으나 에러인 경우
                errorMessage = error.response.data.message || errorMessage;
            } else if (error.request) {
                // 요청이 전송되었지만 응답이 없는 경우
                errorMessage = '서버로부터 응답이 없습니다. 네트워크 상태를 확인해주세요.';
            }

            const errorWithMessage = new Error(errorMessage);
            errorWithMessage.response = error.response;
            throw errorWithMessage;
        }
    },
};
