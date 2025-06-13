import { UnitItem } from './UnitItem';

export const UnitSelector = ({ units, customUnit, selectedUnit, onChangeUnit, setIsModalOpen }) => {
    return (
        <section className="grid w-3/5 grid-cols-3 gap-2 mx-5 mb-5">
            {units.map((unit) => (
                <UnitItem key={unit.name} unit={unit} selectedUnit={selectedUnit} onChangeUnit={onChangeUnit} />
            ))}
            <UnitItem
                key={customUnit.name}
                unit={customUnit}
                selectedUnit={selectedUnit}
                onChangeUnit={onChangeUnit}
                onClick={() => setIsModalOpen(true)}
            />
        </section>
    );
};
