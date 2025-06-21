import React from 'react';
import CommonLayout from '../../layouts/CommonLayout';
import { IoClose } from 'react-icons/io5';
import CupSizeSelector from '../../components/menu/CupSizeSelector';
import OptionsItem from '../../components/menu/OptionsItem';
import ConfiguratorFooter from '../../components/menu/ConfiguratorFooter';
import { CommonText } from '../../components/common/customText';
import { useOptionCount, useCoffee, useQuantity } from '../../hooks/order';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useCupSizes, useCupSize, useOrderActions } from '../../hooks/useMenuConfigurator';

// TODO: props로 전달받는 데이터로 변경
const defaultOptions = [
    { id: 'vanilla', name: '바닐라 시럽', price: 500 },
    { id: 'hazelnut', name: '헤이즐넛 시럽', price: 400 },
    { id: 'caramel', name: '카라멜 시럽', price: 300 },
];

function MenuConfigurator() {
    const navigate = useNavigate();
    const { state: userState, actions: userActions } = useUser();
    const location = useLocation();
    const { state } = location;
    const menuItem = state?.menuItem || {};

    // Custom hooks for business logic
    const availableCupSizes = useCupSizes(menuItem);
    const { cupSize, setCupSize, calculateCupSizePrice } = useCupSize(availableCupSizes);
    const { options, updateOptions, calculateOptionsTotal } = useOptionCount(defaultOptions, 0);
    const { espressoShots, updateEspressoShots, calculateCoffeePrice } = useCoffee();
    const { quantity, updateQuantity } = useQuantity();

    const handleOptionsChange = (optionId, value) => {
        updateOptions(optionId, value);
    };

    const handleQuantityChange = (value) => {
        updateQuantity(value);
    };

    const { calculateTotal, handleAddToCart, handleOrder } = useOrderActions(menuItem, {
        cupSize,
        availableCupSizes,
        calculateCupSizePrice,
        options,
        calculateOptionsTotal,
        espressoShots,
        calculateCoffeePrice,
        quantity,
    });

    const onAddToCart = () => {
        console.log('User state:', userState);
        handleAddToCart(userActions.addToCart);
        // navigate(-1);
    };

    const onOrder = () => {
        handleOrder();
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
                    {/* Cup Selection - Only show for non-dessert items */}
                    {menuItem.itemType !== 'dessert' && (
                        <CupSizeSelector cupSize={cupSize} setCupSize={setCupSize} cupSizes={availableCupSizes} />
                    )}

                    {/* Options */}
                    <section className="overflow-hidden">
                        {/* TODO CommonText props 유현하게 변경 bold와 fontsize가 안 먹음*/}
                        <CommonText fontSize="text-xl" bold={true} className="mb-5">
                            옵션
                        </CommonText>

                        <div className="overflow-y-auto max-h-[40vh] min-h-24">
                            {menuItem.itemType !== 'dessert' && (
                                <OptionsItem
                                    title="커피"
                                    items={[{ id: 'espresso', name: '에스프레소 샷' }]}
                                    selectedValues={{ espresso: espressoShots }}
                                    onValueChange={updateEspressoShots}
                                    minValue={1}
                                    maxValue={5}
                                />
                            )}
                            <OptionsItem
                                title={menuItem.itemType === 'dessert' ? '디저트' : '시럽'}
                                items={defaultOptions}
                                selectedValues={options}
                                onValueChange={handleOptionsChange}
                            />
                        </div>
                    </section>
                </div>

                <ConfiguratorFooter
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                    totalPrice={calculateTotal()}
                    onAddToCart={onAddToCart}
                    onOrder={onOrder}
                />
            </div>
        </CommonLayout>
    );
}

export default MenuConfigurator;
