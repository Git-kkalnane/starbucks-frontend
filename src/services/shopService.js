import api from './api';

// Transform shop data to match frontend data structure
const transformShopData = (data) => {
    if (!data) return [];

    // Handle single shop object
    if (!Array.isArray(data)) {
        return {
            storeId: data.id,
            name: data.name,
            address: data.address,
            phone: data.phone,
            hours: data.openingHours,
            driveThru: data.hasDriveThrough || false,
            seats: data.seatingCapacity?.toString() || '',
            congestion: data.currentCrowdLevel,
            img:
                data.imageUrl || 'https://image.istarbucks.co.kr//upload/store/2021/12/[9319]_20211222090208_scyh3.jpg',
            // Additional fields for detail view
            latitude: data.latitude,
            longitude: data.longitude,
        };
    }

    // Handle array of shops
    return data.map((shop) => ({
        storeId: shop.id,
        name: shop.name,
        address: shop.address,
        phone: shop.phone,
        hours: shop.openingHours,
        driveThru: shop.hasDriveThrough || false,
        seats: shop.seatingCapacity?.toString() || '',
        congestion: shop.currentCrowdLevel,
        img: shop.imageUrl || 'https://image.istarbucks.co.kr//upload/store/2021/12/[9319]_20211222090208_scyh3.jpg',
    }));
};

export const shopService = {
    async fetchShops(page = 0, size = 10) {
        try {
            const response = await api.get('/stores', {
                params: {
                    page,
                    size,
                },
            });
            return transformShopData(response.data.result.stores || response.data.data);
        } catch (error) {
            console.error('Failed to fetch shops:', error);
            throw error;
        }
    },

    async fetchShopDetail(storeId) {
        try {
            const response = await api.get(`/stores/${storeId}`);
            const _shopData = transformShopData(response.data.result || response.data.data);
            console.log('API response shopData: ', _shopData);
            return _shopData;
        } catch (error) {
            console.error(`Failed to fetch shop details for store ${storeId}:`, error);
            throw error;
        }
    },
};

export const sortShops = (shops, sortBy) => {
    const shopsCopy = [...shops];

    switch (sortBy) {
        case 'DT':
            return shopsCopy
                .filter((shop) => shop.driveThru === true)
                .sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));

        case '오름차순':
        default:
            return shopsCopy.sort((a, b) => {
                const driveThruCompare = (b.driveThru ? 1 : 0) - (a.driveThru ? 1 : 0);
                return driveThruCompare === 0 ? a.name.localeCompare(b.name, 'ko-KR') : driveThruCompare;
            });
    }
};
