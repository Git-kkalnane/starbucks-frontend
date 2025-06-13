import React from 'react';
import { CommonText } from '../../common/customText';

const FacilityIcons = ({ facilities, className }) => {
    const facilityList = [
        { key: 'hasDriveThru', label: '드라이브스루', icon: 'DT' },
        { key: 'hasWifi', label: '무선인터넷', icon: 'WiFi' },
        { key: 'hasParking', label: '주차', icon: 'P' },
        { key: 'hasPowerOutlet', label: '콘센트', icon: '⚡' },
    ];

    return (
        <div className={`flex gap-3 py-4 border-t border-gray-100 ${className}`}>
            {facilityList.map((facility) =>
                facilities[facility.key] ? (
                    <div key={facility.key} className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                            <span className="text-able-string">{facility.icon}</span>
                        </div>
                        <CommonText fontSize="2xs" className="text-gray-500">
                            {facility.label}
                        </CommonText>
                    </div>
                ) : null,
            )}
        </div>
    );
};

export default FacilityIcons;
