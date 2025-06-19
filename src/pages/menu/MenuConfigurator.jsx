import React from 'react';
import CommonLayout from '../../layouts/CommonLayout';
import { IoClose } from 'react-icons/io5';
import CupSizeSelector from '../../components/menu/CupSizeSelector';
import OptionsItem from '../../components/menu/OptionsItem';
import ConfiguratorFooter from '../../components/menu/ConfiguratorFooter';
import { CommonText } from '../../components/common/customText';
import { useSyrupCount, useCoffee, useQuantity } from '../../hooks/order';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

// TODO: props로 전달받는 데이터로 변경
const syrupOptions = [
    { id: 'vanilla', name: '바닐라 시럽', price: 500 },
    { id: 'hazelnut', name: '헤이즐넛 시럽', price: 400 },
    { id: 'caramel', name: '카라멜 시럽', price: 300 },
];

const cupSizes = [
    // 에스프레소
    { id: 'solo', name: 'Solo', volume: '30ml', iconSize: 'w-6 h-6' },
    { id: 'doppio', name: 'Doppio', volume: '60ml', iconSize: 'w-8 h-8' },

    // 일반 음료
    { id: 'short', name: 'Short', volume: '250ml', iconSize: 'w-6 h-6' },
    { id: 'tall', name: 'Tall', volume: '355ml', iconSize: 'w-8 h-8' },
    { id: 'grande', name: 'Grande', volume: '473ml', iconSize: 'w-9 h-9' },
    { id: 'venti', name: 'Venti', volume: '591ml', iconSize: 'w-10 h-10' },
];

// TODO 백엔드 시럽을 어떻게 추가할지 의논 필요
const MenuConfigurator = () => {
    const navigate = useNavigate();
    const { state: userState, actions: userActions } = useUser();
    const location = useLocation();
    const { state } = location;
    const menuItem = state?.menuItem || {};

    // Filter available cup sizes based on menuItem.cupSize
    const availableCupSizes = React.useMemo(() => {
        if (!menuItem.cupSize) return cupSizes;

        // Convert the cupSize string to an array of size names
        const availableSizes = menuItem.cupSize.split('/').map((size) => size.trim().toLowerCase());

        // Filter cupSizes to only include those mentioned in menuItem.cupSize
        return cupSizes.filter((size) =>
            availableSizes.some((availableSize) => size.name.toLowerCase().includes(availableSize)),
        );
    }, [menuItem.cupSize]);

    // Set default cup size to the first available size
    const [cupSize, setCupSize] = React.useState(availableCupSizes[0]?.id || 'tall');
    const { syrups, updateSyrup, calculateSyrupTotal } = useSyrupCount(syrupOptions, 0);
    const { espressoShots, updateEspressoShots, calculateCoffeePrice } = useCoffee();
    const { quantity, updateQuantity } = useQuantity();

    const handleSyrupChange = (syrupId, value) => {
        updateSyrup(syrupId, value);
    };

    const handleQuantityChange = (value) => {
        updateQuantity(value);
    };

    const calculateCupSizePrice = (selectedSize, availableSizes, pricePerSizeUp = 500) => {
        // cupSize의 순서를 정의
        const sizeOrder = ['solo', 'doppio', 'short', 'tall', 'grande', 'venti'];

        // 선택된 사이즈의 인덱스를 가져옴
        const selectedSizeIndex = sizeOrder.indexOf(selectedSize);
        // 사용 가능한 사이즈 중 가장 작은 사이즈의 인덱스를 가져옴
        const smallestAvailableSize = availableSizes[0]?.id || 'tall';
        const smallestSizeIndex = sizeOrder.indexOf(smallestAvailableSize);

        // 사이즈 차이를 계산하고 추가 가격을 반환
        if (selectedSizeIndex > -1 && smallestSizeIndex > -1) {
            const sizeDifference = selectedSizeIndex - smallestSizeIndex;
            return Math.max(0, sizeDifference * pricePerSizeUp); // Ensure non-negative
        }

        return 0;
    };

    const calculateTotal = () => {
        let total = menuItem.price;

        // 컵 사이즈 가격 추가
        total += calculateCupSizePrice(cupSize, availableCupSizes);
        // 커피 가격 추가
        total += calculateCoffeePrice();
        // 시럽 가격 추가
        total += calculateSyrupTotal();

        return total * quantity;
    };

    const handleAddToCart = () => {
        console.log('User state:', userState);
        const orderData = {
            id: menuItem.id,
            koreanName: menuItem.koreanName,
            englishName: menuItem.englishName,
            itemType: menuItem.itemType,
            temperatureOption: menuItem.temperatureOption ?? '',
            cupSize,
            options: menuItem.options ?? [], // TOD: 옵션추가 기능 추가하기
            quantity,
            totalPrice: calculateTotal(),
            itemPrice: menuItem.price,
        };
        console.log('Added to cart:', orderData);
        // OrderItem을 저장
        userActions.addToCart(orderData);
        // navigate(-1);
    };

    const handleOrder = () => {
        // TODO: Order 로직 구현
        console.log('Order placed:', {
            cupSize,
            espressoShots,
            options: syrups,
            quantity,
            price: calculateTotal(),
        });
    };

    return (
        <CommonLayout>
            <div className="w-full max-w-md">
                {/* Header with Menu Info */}
                <section className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{menuItem?.koreanName || '메뉴 선택'}</h1>
                            {menuItem?.englishName && (
                                <p className="text-sm text-gray-500 mt-1">{menuItem.englishName}</p>
                            )}
                            {menuItem?.price && (
                                <p className="text-base font-medium text-gray-900 mt-1">
                                    {menuItem.price.toLocaleString()}원
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => navigate(-1)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                            aria-label="Close"
                        >
                            <IoClose className="w-6 h-6" />
                        </button>
                    </div>
                </section>

                <div className="px-5">
                    {/* Cup Selection */}
                    <CupSizeSelector cupSize={cupSize} setCupSize={setCupSize} cupSizes={availableCupSizes} />

                    {/* Options */}
                    <section className="overflow-hidden">
                        {/* TODO CommonText props 유현하게 변경 bold와 fontsize가 안 먹음*/}
                        <CommonText fontSize="text-xl" bold={true} className="mb-5">
                            옵션
                        </CommonText>

                        <div className="overflow-y-auto max-h-[40vh] min-h-24">
                            <OptionsItem
                                title="커피"
                                items={[{ id: 'espresso', name: '에스프레소 샷' }]}
                                selectedValues={{ espresso: espressoShots }}
                                onValueChange={updateEspressoShots}
                                minValue={1}
                                maxValue={5}
                            />

                            <OptionsItem
                                title="시럽"
                                items={syrupOptions}
                                selectedValues={syrups}
                                onValueChange={handleSyrupChange}
                            />
                        </div>
                    </section>
                </div>

                <ConfiguratorFooter
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                    totalPrice={calculateTotal()}
                    onAddToCart={handleAddToCart}
                    onOrder={handleOrder}
                />
            </div>
        </CommonLayout>
    );
};

export default MenuConfigurator;
