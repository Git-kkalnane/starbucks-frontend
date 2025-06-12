import React from 'react';
import DtSVG from '../../assets/icons/dt-icon.svg?react';

function ShopItem({ shop, className = '', onClick }) {
    return (
        <div
            className={`flex py-4 border-b border-gray-100 items-start ${className} ${
                onClick ? 'cursor-pointer hover:bg-gray-50' : ''
            }`}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={
                onClick
                    ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onClick(e);
                          }
                      }
                    : undefined
            }
        >
            <div className="flex-shrink-0 mr-4" style={{ width: '7rem', height: '7rem' }}>
                <div className="relative w-full h-full bg-gray-100 rounded overflow-hidden">
                    <img src={shop.img} alt={shop.name} className="absolute inset-0 w-full h-full object-cover" />
                </div>
            </div>
            <div className="flex-1">
                <h3 className="m-0 text-base font-medium">{shop.name}</h3>
                <p className="m-0 text-sm text-gray-600 mb-1 pr-8">{shop.address}</p>
                {shop.driveThru === 'True' && (
                    <div className="flex items-center gap-1">
                        <DtSVG width={20} height={20} className="text-gray-500" />
                    </div>
                )}
            </div>
        </div>
    );
}

function ShopListPanel({ shops, className = '' }) {
    if (!shops || shops.length === 0) {
        return <div className="text-center py-8 text-gray-500">매장이 없습니다.</div>;
    }

    return (
        <section className={`py-4 ${className}`}>
            {shops.map((shop, index) => (
                <ShopItem key={shop.storeId || index} shop={shop} onClick={() => console.log('Shop clicked:', shop)} />
            ))}
        </section>
    );
}

export default ShopListPanel;
