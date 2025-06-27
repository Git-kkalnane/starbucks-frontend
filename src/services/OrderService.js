import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
const API_VERSION = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const api = axios.create({
    baseURL: URL + API_VERSION,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Transform drink data to match frontend data structure
const transformDrinkData = (apiData) => {
    if (!apiData?.items) return [];
    
    return apiData.items.map(item => ({
        id: item.id,
        koreanName: item.nameKo,
        englishName: item.nameEn,
        price: item.price,
        img: item.iceImageUrl || item.hotImageUrl || '',
        // Add additional fields if needed
        sizeOptions: item.sizeOption || [],
        temperatureOptions: item.temperatureOption || [],
        shotOptions: item.shotOption || []
    }));
};

export const OrderQueryService = {
    async fetchDrinkItems(page = 0, size = 10) {
        try {
            const response = await api.get('/items/drinks', {
                params: { page, size }
            });
            
            // Transform the API response
            const transformedData = transformDrinkData(response.data.result);
            
            // Return both the transformed items and pagination info
            return {
                items: transformedData,
                pagination: {
                    totalCount: response.data.result.totalCount,
                    currentPage: response.data.result.currentPage,
                    totalPages: response.data.result.totalPages,
                    pageSize: response.data.result.pageSize
                }
            };
        } catch (error) {
            console.error('Failed to fetch drinks:', error);
            throw error;
        }
    },
    async fetchDessertItems(page = 0, size = 10) {
        try {
            const response = await api.get('/items/desserts', {
                params: { page, size }
            });
            
            // Transform the API response
            const transformedData = transformDrinkData(response.data.result);
            
            // Return both the transformed items and pagination info
            return {
                items: transformedData,
                pagination: {
                    totalCount: response.data.result.totalCount,
                    currentPage: response.data.result.currentPage,
                    totalPages: response.data.result.totalPages,
                    pageSize: response.data.result.pageSize
                }
            };
        } catch (error) {
            console.error('Failed to fetch desserts:', error);
            throw error;
        }
    },
};
