import React, { useState } from 'react';
import CommonLayout from '../layouts/CommonLayout';
import { ColumnHeader } from '../components/common/customHeader';
import CartSummary from '../components/cart/CartSummary';
import CartItemList from '../components/cart/CartItemList';
import StoreSelectionBanner from '../components/common/StoreSelectionBanner';
import { useNavigate } from 'react-router-dom';
import CartEmptyView from '../components/cart/CartEmptyView';

// 샘플 데이터
const sampleCart = [
    {
        id: 1,
        name: '아이스 카페 아메리카노',
        eng: 'Iced Cafe Americano',
        option: 'ICED | Tall',
        price: 4700,
        qty: 3,
        img: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110563]_20210426095937808.jpg',
    },
    {
        id: 2,
        name: '플랫 화이트',
        eng: 'Flat White',
        option: 'HOT | Tall',
        price: 5800,
        qty: 2,
        img: 'https://image.istarbucks.co.kr/upload/store/skuimg/2024/03/[9200000005178]_20240326103727795.jpg',
    },
    {
        id: 3,
        name: '아이스 카페 아메리카노',
        eng: 'Iced Cafe Americano',
        option: 'ICED | Tall',
        price: 4700,
        qty: 3,
        img: 'https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[110563]_20210426095937808.jpg',
    },
    {
        id: 4,
        name: '플랫 화이트',
        eng: 'Flat White',
        option: 'HOT | Tall',
        price: 5800,
        qty: 2,
        img: 'https://image.istarbucks.co.kr/upload/store/skuimg/2024/03/[9200000005178]_20240326103727795.jpg',
    },
];

function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState(sampleCart); // 메뉴가 있는 상태로 기본 세팅
    const [selected, setSelected] = useState([]);

    const isAllSelected = cart.length > 0 && selected.length === cart.length;
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

    // 선택/해제
    const toggleSelect = (id) => {
        setSelected((prev) => (prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]));
    };
    const toggleAll = () => {
        setSelected(isAllSelected ? [] : cart.map((item) => item.id));
    };
    // 수량 변경
    const changeQty = (id, diff) => {
        setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty: Math.max(1, item.qty + diff) } : item)));
    };
    // 삭제
    const removeItem = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
        setSelected((prev) => prev.filter((sid) => sid !== id));
    };
    // 선택삭제
    const removeSelected = () => {
        setCart((prev) => prev.filter((item) => !selected.includes(item.id)));
        setSelected([]);
    };
    const removeAll = () => {
        setCart([]);
        setSelected([]);
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
