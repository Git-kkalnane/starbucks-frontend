import React from 'react';
import MenuHeader from '../MenuHeader';

const MenuHeaderPanel = ({ itemType, menuItem, isIced, onBack }) => {
    if (itemType === 'beverage') {
        return (
            <MenuHeader
                imageUrl={isIced ? menuItem.img?.cold || '' : menuItem.img?.hot || ''}
                name={menuItem.koreanName}
                onBack={onBack}
            />
        );
    }

    if (itemType === 'dessert') {
        return <MenuHeader imageUrl={menuItem.img} name={menuItem.koreanName} onBack={onBack} />;
    }

    return null;
};

export default MenuHeaderPanel;
