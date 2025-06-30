import React, { useState } from 'react';
import CommonLayout from '../components/layouts/CommonLayout';
import { ColumnHeader } from '../components/common/customHeader';
import CartSummary from '../components/cart/CartSummary';
import CartItemList from '../components/cart/CartItemList';
import StoreSelectionBanner from '../components/common/StoreSelectionBanner';
import { useNavigate } from 'react-router-dom';
import CartEmptyView from '../components/cart/CartEmptyView';
import { useUser } from '../contexts/UserContext';
import { starbucksStorage } from '../store/starbucksStorage';
import useAuthRedirect from '../hooks/useAuthRedirect';
import { OrderCommandService } from '../services/OrderService';
import ConfirmationModal from '../components/common/ConfirmationModal';

function Cart() {
    const { state, actions } = useUser();
    const navigate = useNavigate();

    const [cart, setCart] = useState(state.cart || []);
    const [selected, setSelected] = useState([]);
    const [showStoreSelectModal, setShowStoreSelectModal] = useState(false);

    useAuthRedirect({
        requireAuth: true,
        redirectTo: '/login',
        authState: state,
    });

    const isAllSelected = cart.length > 0 && selected.length === cart.length;
    const selectedTotalQty =
        selected.length > 0
            ? cart.filter((item) => selected.includes(item.id)).reduce((sum, item) => sum + item.quantity, 0)
            : 0;

    const selectedTotalPrice =
        selected.length > 0
            ? cart
                  .filter((item) => selected.includes(item.id))
                  .reduce((sum, item) => sum + item.priceWithOptions * item.quantity, 0)
            : 0;
    // 선택/해제
    const toggleSelect = (id) => {
        setSelected((prev) => (prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]));
    };

    const toggleAll = () => {
        setSelected(isAllSelected ? [] : cart.map((item) => item.id));
    };
    // 수량 변경
    const changeQty = (id, diff) => {
        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + diff);
                actions.updateCartItem(id, { quantity: newQuantity });

                return {
                    ...item,
                    quantity: newQuantity,
                };
            }

            return item;
        });

        setCart(updatedCart);
    };
    // 삭제
    const removeItem = (id) => {
        setCart((prev) => {
            const newCart = prev.filter((item) => item.id !== id);
            starbucksStorage.setCart(newCart);
            return newCart;
        });
        setSelected((prev) => prev.filter((sid) => sid !== id));
        actions.removeFromCart(id);
    };
    // 선택삭제
    const removeSelected = () => {
        if (selected.length === 0) return;

        setCart((prev) => {
            const newCart = prev.filter((item) => !selected.includes(item.id));
            starbucksStorage.setCart(newCart);
            return newCart;
        });
        actions.removeFromCart(selected);
        setSelected([]);
    };

    // 전체 삭제
    const removeAll = () => {
        setCart([]);
        setSelected([]);
        actions.clearCart();
        starbucksStorage.setCart([]);
    };
    const handleOrder = async () => {
        if (!state.selectedStore) {
            setShowStoreSelectModal(true);
            return;
        }

        const orderData = {
            storeId: state.selectedStore.storeId,
            pickupType: 'STORE_PICKUP',
            orderTotalPrice: selectedTotalPrice,
            orderStatus: 'PLACED',
            orderItems: selected.map((id) => {
                console.log('selected id: ', id);
                const cartItem = cart.find((item) => item.id === id);
                console.log('cartId: ', cartItem.id);
                console.log(`${cartItem.item.koreanName} item price: ${cartItem.item.id}`);
                return {
                    itemId: cartItem.item.id,
                    itemType: cartItem.item.category,
                    beverageSizeOption: cartItem.size || null,
                    beverageTemperatureOption: cartItem.temperature || null,
                    options: cartItem.options || [],
                    totalPrice: cartItem.priceWithOptions * cartItem.quantity,
                    itemPrice: cartItem.item.price,
                    quantity: cartItem.quantity,
                };
            }),
        };

        try {
            const response = await OrderCommandService.createOrder(orderData);
            removeSelected();

            navigate('/order', { state: { orderId: response.id } });
        } catch (error) {
            console.error('Failed to create order:', error);
            // You might want to show an error message to the user here
            alert(`주문 처리 중 오류가 발생했습니다: ${error.message}`);
        }
    };

    return (
        <CommonLayout>
            {/* <CartHeader title="장바구니" onBack={() => history.back()} /> */}
            <ColumnHeader title="장바구니" bgColor="#2E2926" onBack={() => history.back()} textColor="#fff" />

            <StoreSelectionBanner title={state.selectedStore ? state.selectedStore.name : '매장 선택'} />
            <div className="bg-white min-h-screen pt-2">
                {cart.length > 0 ? (
                    <CartItemList
                        items={cart}
                        selected={selected}
                        isAllSelected={isAllSelected}
                        onToggleAll={toggleAll}
                        onToggleSelect={toggleSelect}
                        onChangeQty={changeQty}
                        onRemoveAll={removeAll}
                        onRemoveSelected={removeSelected}
                        onRemoveItem={removeItem}
                    />
                ) : (
                    <CartEmptyView onNavigateToMenu={() => navigate('/order')} />
                )}
                <CartSummary
                    selectedCount={selected.length}
                    totalQty={selectedTotalQty}
                    totalPrice={selectedTotalPrice}
                    onOrder={handleOrder}
                />
            </div>
            {/* 매장 선택 안내 모달 */}
            <ConfirmationModal
                open={showStoreSelectModal}
                title="매장을 선택해주세요"
                subtitle="주문을 하시려면 먼저 매장을 선택해주세요."
                onConfirm={() => {
                    setShowStoreSelectModal(false);
                    navigate('/order/shop');
                }}
                onCancel={() => setShowStoreSelectModal(false)}
            />
        </CommonLayout>
    );
}

export default Cart;
