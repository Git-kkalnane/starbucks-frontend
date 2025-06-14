export const UnitItem = ({ unit, selectedUnit, onChangeUnit, onClick }) => {
    return (
        <label
            className={`flex justify-center py-2 text-lg border-[#C0C0C0] border rounded-lg unit-btn ${
                selectedUnit === unit.value ? 'bg-[#01A862] border-[#01A862]' : 'border-[#C0C0C0]'
            }`}
            key={unit.name}
        >
            <input
                type="radio"
                name={unit.name}
                className="hidden"
                value={unit.value}
                onClick={onClick}
                onChange={onChangeUnit}
                checked={selectedUnit === unit.value}
            />
            <span className={`unit ${selectedUnit === unit.value ? 'text-white' : 'text-black'}`}>{unit.text}</span>
        </label>
    );
};
