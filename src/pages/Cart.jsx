import React, { useState } from 'react';
import CommonLayout from '../layouts/CommonLayout';
import { ColumnHeader } from '../components/common/customHeader';
import CartSummary from '../components/cart/CartSummary';
import CartItemList from '../components/cart/CartItemList';
import StoreSelectionBanner from '../components/common/StoreSelectionBanner';
import { useNavigate } from 'react-router-dom';
import CartEmptyView from '../components/cart/CartEmptyView';
import { useUser } from '../contexts/UserContext';

function Cart() {
    const { state, actions } = useUser();

    const [cart, setCart] = useState(state.cart || []);
    const [selected, setSelected] = useState([]);

    const isAllSelected = cart.length > 0 && selected.length === cart.length;
    const totalQty =
        selected.length > 0
            ? cart.filter((item) => selected.includes(item.id)).reduce((sum, item) => sum + item.quantity, 0)
            : 0;

    const totalPrice =
        selected.length > 0
            ? cart.filter((item) => selected.includes(item.id)).reduce((sum, item) => sum + item.totalPrice, 0)
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
                const pricePerItem = item.totalPrice / item.quantity;
                actions.updateCartItem(id, { quantity: newQuantity });

                return {
                    ...item,
                    quantity: newQuantity,
                    totalPrice: Math.round(pricePerItem * newQuantity), // Round to avoid floating point issues
                };
            }

            return item;
        });

        setCart(updatedCart);
    };
    // 삭제
    const removeItem = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
        setSelected((prev) => prev.filter((sid) => sid !== id));
        actions.removeFromCart(id);
    };
    // 선택삭제
    const removeSelected = () => {
        if (selected.length === 0) return;
        
        setCart((prev) => prev.filter((item) => !selected.includes(item.id)));
        actions.removeFromCart(selected);
        setSelected([]);
    };
    const removeAll = () => {
        setCart([]);
        setSelected([]);
        actions.clearCart();
    };

    return (
        <CommonLayout>
            {/* <CartHeader title="장바구니" onBack={() => history.back()} /> */}
            <ColumnHeader title="장바구니" bgColor="#2E2926" onBack={() => history.back()} textColor="#fff" />

            <StoreSelectionBanner title="매장 선택" />
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
                    <CartEmptyView />
                )}
                <CartSummary
                    selectedCount={selected.length}
                    totalQty={totalQty}
                    totalPrice={totalPrice}
                    onOrder={() => {
                        /* 주문하기 로직 */
                    }}
                />
            </div>
        </CommonLayout>
    );
}

export default Cart;
