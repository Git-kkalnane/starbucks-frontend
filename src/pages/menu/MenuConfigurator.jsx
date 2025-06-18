import React from 'react';
import CommonLayout from '../../layouts/CommonLayout';
import { IoClose } from 'react-icons/io5';
import CupSizeSelector from '../../components/menu/CupSizeSelector';
import OptionsItem from '../../components/menu/OptionsItem';
import ConfiguratorFooter from '../../components/menu/ConfiguratorFooter';
import { CommonText } from '../../components/common/customText';
import { useSyrupCount, useCoffee, useQuantity } from '../../hooks/order';

// TODO: props로 전달받는 데이터로 변경
const syrupOptions = [
    { id: 'vanilla', name: '바닐라 시럽', price: 500 },
    { id: 'hazelnut', name: '헤이즐넛 시럽', price: 400 },
    { id: 'caramel', name: '카라멜 시럽', price: 300 },
    { id: 'syrup1', name: '시럽1', price: 550 },
    { id: 'syrup2', name: '시럽2', price: 450 },
    { id: 'syrup3', name: '시럽3', price: 350 },
];

const cupSizes = [
    { id: 'tall', name: 'Tall', volume: '355ml', iconSize: 'w-8 h-8' },
    { id: 'grande', name: 'Grande', volume: '473ml', iconSize: 'w-9 h-9' },
    { id: 'venti', name: 'Venti', volume: '591ml', iconSize: 'w-10 h-10' },
];

const MenuConfigurator = ({ onClose }) => {
    const [cupSize, setCupSize] = React.useState('tall');
    const { syrups, updateSyrup, calculateSyrupTotal } = useSyrupCount(syrupOptions, 2);
    const { espressoShots, updateEspressoShots, calculateCoffeePrice } = useCoffee();
    const { quantity, updateQuantity } = useQuantity();

    const handleSyrupChange = (syrupId, value) => {
        updateSyrup(syrupId, value);
    };

    const handleQuantityChange = (value) => {
        updateQuantity(value);
    };

    const calculateTotal = () => {
        let total = 4500; // Base price for tall size
        if (cupSize === 'grande') total += 500;
        if (cupSize === 'venti') total += 1000;

        total += calculateCoffeePrice();
        total += calculateSyrupTotal();

        return total * quantity;
    };

    const handleAddToCart = () => {
        // TODO: Add to cart 로직 구현
        console.log('Added to cart:', {
            cupSize,
            espressoShots,
            syrups,
            quantity,
            totalPrice: calculateTotal(),
        });
        onClose?.();
    };

    const handleOrder = () => {
        // TODO: Order 로직 구현
        console.log('Order placed:', {
            cupSize,
            espressoShots,
            syrups,
            quantity,
            totalPrice: calculateTotal(),
        });
    };

    return (
        <CommonLayout>
            <div className="w-full max-w-md">
                {/* Header */}
                <section className="flex justify-between items-center px-2 pt-2">
                    <div></div>
                    <button onClick={onClose} className="p-1">
                        <IoClose className="w-7 h-7" />
                    </button>
                </section>

                <div className="px-5">
                    {/* Cup Selection */}
                    <CupSizeSelector cupSize={cupSize} setCupSize={setCupSize} cupSizes={cupSizes} />

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
