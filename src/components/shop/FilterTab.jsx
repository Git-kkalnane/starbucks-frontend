import React from 'react';
import DtSVG from '../../assets/icons/dt-icon.svg?react';
import SortDescSVG from '../../assets/icons/sort-desc-icon.svg?react';

function FilterTabs({ maxH = 'h-18', className = '', onFilterChange, activeFilter = '오름차순' }) {
    const iconSize = 20;

    const filterButtons = [
        {
            id: 'DT',
            label: 'DT',
            icon: <DtSVG width={iconSize} height={iconSize} />,
            group: 'left',
        },
        {
            id: '오름차순',
            label: '오름차순',
            icon: <SortDescSVG width={16} height={16} />,
            group: 'left',
        },
    ];

    const handleClick = (id) => {
        if (onFilterChange) {
            onFilterChange(id);
        }
    };

    const renderFilterGroup = (groupName) => {
        return filterButtons
            .filter((button) => button.group === groupName)
            .map((btn) => (
                <FilterButton
                    key={btn.id}
                    active={activeFilter === btn.id}
                    onClick={() => handleClick(btn.id)}
                    icon={btn.icon}
                >
                    {btn.label}
                </FilterButton>
            ));
    };

    return (
        <div className={`flex justify-between items-center pt-1 gap-2 ${maxH} ${className}`}>
            {/* Left filter group */}
            <div className="flex gap-2">{renderFilterGroup('left')}</div>

            {/* Right filter group */}
            <div>{renderFilterGroup('right')}</div>
        </div>
    );
}

export default FilterTabs;

function FilterButton({ children, active, onClick, icon, height = 'h-9' }) {
    const baseClasses = 'px-3 py-1 border rounded-md text-sm whitespace-nowrap flex items-center justify-center gap-1';

    const activeClasses = 'bg-main-button text-white border-main-button font-medium';

    const inactiveClasses = 'text-main-button border-disabled-string';

    return (
        <button onClick={onClick} className={`${baseClasses} ${active ? activeClasses : inactiveClasses} ${height}`}>
            {icon && <span>{icon}</span>}
            {children}
        </button>
    );
}
