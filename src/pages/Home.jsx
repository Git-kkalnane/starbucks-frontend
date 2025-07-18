import React, { useEffect, useState } from 'react';
import Showcase from '../components/home/Showcase';
import AuthPanel from '../components/home/AuthPanel';
import { CommonHeader } from '../components/common/customHeader';
import CommonLayout from '../components/layouts/CommonLayout';
import { OrderQueryService } from '../services/OrderService';
import { Box, Typography, List, ListItem, Divider, Chip, Paper } from '@mui/material';

const OrderInfo = ({ order }) => {
    if (!order) return null;

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2">
                    주문 번호: {order.orderIdUI}
                </Typography>
                <Chip
                    label={order.orderStatus}
                    color={
                        order.orderStatus === 'COMPLETED'
                            ? 'success'
                            : order.orderStatus === 'PREPARING'
                            ? 'warning'
                            : 'primary'
                    }
                />
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                    {order.storeName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {order.storeAddress}
                </Typography>
                <Chip label={order.pickupType} variant="outlined" size="small" sx={{ mt: 1 }} />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                주문 내역
            </Typography>
            <List dense>
                {order.orderItems.map((item, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Typography variant="body2">
                                {item.name} × {item.quantity}
                            </Typography>
                            <Typography variant="body2">{item.price.toLocaleString()}원</Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

const carouselItems = [
    {
        id: 1,
        title: '스타벅스와 함께하는 여름',
        subtitle: '시원한 여름 음료와 함께 특별한 혜택을 만나보세요',
        image: 'data:image/jpeg;base64,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',
    },
    {
        id: 2,
        title: '새로운 시즌 메뉴',
        subtitle: '한정 기간 특별 할인',
        image: 'data:image/jpeg;base64,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',
    },
];

const Home = () => {
    const [currentOrder, setCurrentOrder] = useState(null);

    // useEffect(() => {
    //     const loadOrder = async () => {
    //         try {
    //             const orderData = await OrderQueryService.fetchCurrentOrder();
    //             setCurrentOrder(orderData);
    //         } catch (error) {
    //             console.error('Failed to fetch current order:', error);
    //             setCurrentOrder(null);
    //         }
    //     };

    //     loadOrder();
    // }, []);

    return (
        <CommonLayout>
            <CommonHeader title="" />
            <AuthPanel />

            {currentOrder && (
                <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
                    <OrderInfo order={currentOrder} />
                </Box>
            )}

            <Showcase carouselItems={carouselItems} title="What's New" className="mb-10" />
            <Showcase carouselItems={carouselItems} title="신규 이벤트" />
        </CommonLayout>
    );
};

export default Home;
