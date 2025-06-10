import axios from 'axios';

// 임시로 사용중
const transformNotionData = (data) => {
    return data.results.map((page) => {
        const properties = page.properties;
        return {
            storeId: properties['매장 ID']?.title?.[0]?.plain_text ?? '',
            name: properties['매장명']?.rich_text?.[0]?.plain_text ?? '',
            address: properties['주소']?.rich_text?.[0]?.plain_text ?? '',
            phone: properties['전화번호']?.phone_number ?? '',
            hours: properties['영업시간']?.rich_text?.[0]?.plain_text ?? '',
            driveThru: properties['드라이버스루']?.select?.name ?? '',
            seats: properties['죄석 수']?.rich_text?.[0]?.plain_text ?? '',
            congestion: properties['혼잡여부']?.select?.name ?? '',
            img: 'https://image.istarbucks.co.kr//upload/store/2021/12/[9319]_20211222090208_scyh3.jpg',
        };
    });
};

// TODO: 서버 개발 후 로직 변경 예정 (임시로 notion API사용)
export const shopService = {
    async fetchShops() {
        try {
            const response = await axios.post(
                '/api/v1/databases/20ef1eb21fb180c3acc8f3089a79e719/query',
                {},
                { headers: { 'Content-Type': 'application/json' } },
            );

            return transformNotionData(response.data);
        } catch (error) {
            console.error('Failed to fetch shops:', error);
            throw error;
        }
    },
};

export const sortShops = (shops, sortBy) => {
    const shopsCopy = [...shops];

    switch (sortBy) {
        case 'DT':
            return shopsCopy
                .filter((shop) => shop.driveThru === 'True')
                .sort((a, b) => a.name.localeCompare(b.name, 'ko-KR'));

        case '오름차순':
        default:
            return shopsCopy.sort((a, b) => {
                const driveThruCompare = (b.driveThru ? 1 : 0) - (a.driveThru ? 1 : 0);
                return driveThruCompare === 0 ? a.name.localeCompare(b.name, 'ko-KR') : driveThruCompare;
            });
    }
};
