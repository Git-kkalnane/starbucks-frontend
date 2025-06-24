import React from 'react';
import { CommonText } from '../../common/customText';
import QuantityControl from '../../common/QuantityControl';

const OptionsItem = ({
    title,
    items = [],
    selectedValues = {},
    onValueChange = () => {},
    minValue = 0,
    maxValue = Infinity,
    disabled = false,
}) => {
    return (
        <div className="mb-4">
            <CommonText fontSize="text-lg" className="mb-3">
                {title}
            </CommonText>
            <div className="space-y-1">
                {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center px-3 py-1">
                        <span className="text-sm">{item.name}</span>
                        <QuantityControl
                            value={selectedValues[item.id] || 0}
                            onIncrease={() => onValueChange(item.id, 1)}
                            onDecrease={() => onValueChange(item.id, -1)}
                            minValue={minValue}
                            maxValue={maxValue}
                            disabled={disabled}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OptionsItem;
