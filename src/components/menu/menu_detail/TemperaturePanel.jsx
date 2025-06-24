import React from 'react';
import TemperatureToggle from './TemperatureToggle';
import TemperatureDisplay from './TemperatureDisplay';

const TemperaturePanel = ({ itemType, initTemperatureOption, isIced, setIsIced, isCoffee = true, className = '' }) => {
    if (itemType !== 'beverage') return null;

    return (
        <div className={`mt-4 mb-24 ${className}`}>
            {initTemperatureOption === 'Ice only' || initTemperatureOption === 'Hot only' ? (
                <TemperatureDisplay
                    isIced={initTemperatureOption === 'Ice only'}
                    isActive={true}
                    className="max-w-xs mx-auto"
                />
            ) : (
                <TemperatureToggle
                    isIced={isIced}
                    setIsIced={setIsIced}
                    disabled={!isCoffee}
                    className={!isCoffee ? 'opacity-70' : ''}
                />
            )}
        </div>
    );
};

export default TemperaturePanel;
