import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import ConfirmLoginModal from '../../components/common/ConfirmLoginModal';
import CommonLayout from '../../layouts/CommonLayout';
import { CommonHeader } from '../../components/common/customHeader';
import ShopImage from '../../components/shop/shop_detail/ShopImage';
import ShopBasicInfo from '../../components/shop/shop_detail/ShopBasicInfo';
import { CommonDivider } from '../../components/common/Divider';
import ShopHoursAndDirections from '../../components/shop/shop_detail/ShopHoursAndDirections';
import OrderTypeSelector from '../../components/shop/shop_detail/OrderTypeSelector';
import { shopService } from '../../services/shopService';
import { useParams } from 'react-router-dom';

function ShopDetail() {
    const { state: userState } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const { storeId } = useParams();
    const [shopData, setShopData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [orderTypeTmp, setOrderTypeTmp] = useState(null);

    useEffect(() => {
        // If shop data is passed in location state, use it
        if (location.state?.shop) {
            setShopData(location.state.shop);
            return;
        }

        // Otherwise, fetch from API
        const fetchShopData = async () => {
            if (!storeId) {
                setError('Store ID is missing');
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const response = await api.get(`/api/shops/${storeId}`);
                setShopData(response.data);
            } catch (err) {
                console.error('Error fetching shop data:', err);
                setError('Failed to load shop data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchShopData();
    }, [storeId, location.state]);

    const handleOrderTypeSelect = (orderType) => {
        if (!userState.isAuthenticated) {
            setOrderTypeTmp(orderType);
            setLoginModalOpen(true);
            return;
        }
        // 로그인된 경우 기존 로직
        console.log('Selected order type:', orderType, 'for shop:', shopData?.storeId);
    };

    // Loading state
    if (isLoading) {
        return (
            <CommonLayout className="flex items-center justify-center">
                <div>Loading shop information...</div>
            </CommonLayout>
        );
    }

    // Error state
    if (error || !shopData) {
        return (
            <CommonLayout className="flex flex-col items-center justify-center p-4">
                <div className="text-red-500 mb-4">{error || 'Shop not found'}</div>
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Go Back
                </button>
            </CommonLayout>
        );
    }

    return (
        <CommonLayout className="bg-white min-h-screen flex flex-col">
            <CommonHeader onBack={() => navigate(-1)} />

            <ShopImage image={shopData.img} name={shopData.name} />

            <div className="flex-1 p-6">
                <ShopBasicInfo name={shopData.name} address={shopData.address} className="mb-6" />

                <CommonDivider thickness={8} color="gray-100" />

                <ShopHoursAndDirections
                    businessHours={shopData.businessHours}
                    direction={shopData.direction}
                    className="mb-6"
                />
            </div>

            <OrderTypeSelector onSelectOrderType={handleOrderTypeSelect} />
            <ConfirmLoginModal
                open={loginModalOpen}
                onConfirm={() => {
                    setLoginModalOpen(false);
                    navigate('/login');
                }}
                onCancel={() => setLoginModalOpen(false)}
            />
        </CommonLayout>
    );
}

export default ShopDetail;
