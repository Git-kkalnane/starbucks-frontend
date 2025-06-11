import React from 'react';
import ShoppingCartControls from './CartControls';
import CartItem from './CartItem';

function CartItemList({
    items,
    selected,
    isAllSelected,
    onToggleAll,
    onToggleSelect,
    onChangeQty,
    onRemoveAll,
    onRemoveSelected,
    onRemoveItem,
}) {
    return (
        <section className="px-4 py-3">
            <ShoppingCartControls
                isAllSelected={isAllSelected}
                onToggleAll={onToggleAll}
                onRemoveSelected={onRemoveSelected}
                onRemoveAll={onRemoveAll}
                className="mb-4"
            />
            <div className="space-y-4 overflow-y-auto h-[calc(100vh-200px)]">
                {items.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        isSelected={selected.includes(item.id)}
                        onToggleSelect={() => onToggleSelect(item.id)}
                        onRemove={() => onRemoveItem(item.id)}
                        onChangeQty={(diff) => onChangeQty(item.id, diff)}
                    />
                ))}
            </div>
        </section>
    );
}

export default CartItemList;
