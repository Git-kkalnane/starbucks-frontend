import { useState } from 'react';
import { ColumnHeader } from '../components/common/customHeader';
import { CommonText } from '../components/common/customText';
import CommonLayout from '../components/layouts/CommonLayout';
import { UnitSelector } from '../components/charge/UnitSelector';
import { ChargeModal } from '../components/charge/ChargeModal';
import { CommonBtn } from '../components/common/customBtn';

function Charge() {
    const [selectedUnit, setSelectedUnit] = useState(0);
    const [customUnitValue, setCustomUnitValue] = useState(550000);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const units = [
        { name: 'one', text: '1만원', value: 10000 },
        { name: 'three', text: '3만원', value: 30000 },
        { name: 'five', text: '5만원', value: 50000 },
        { name: 'seven', text: '7만원', value: 70000 },
        { name: 'ten', text: '10만원', value: 100000 },
    ];

    const customUnit = { name: 'other', text: '다른 금액', value: customUnitValue };

    const onChangeUnit = (e) => {
        setSelectedUnit(Number(e.target.value));
    };

    const modifyCustomUnitValue = (value) => {
        setCustomUnitValue(value);
    };

    return (
        <CommonLayout className="relative">
            <ColumnHeader
                title="충전하기"
                onBack={() => window.history.back()}
                height="h-32"
                bgColor="white"
                className="shadow-[0_2px_3px_-1px_rgba(0,0,0,0.3)]"
            />
            <div>
                <div>
                    <CommonText className="mx-5 my-5" fontSize="text-2xl" weight="font-semibold">
                        충전 금액
                    </CommonText>
                    <UnitSelector
                        units={units}
                        customUnit={customUnit}
                        selectedUnit={selectedUnit}
                        onChangeUnit={onChangeUnit}
                        setIsModalOpen={setIsModalOpen}
                    />
                </div>
                <hr />
                <div>
                    <CommonText className="mx-5 my-5" fontSize="text-2xl" weight="font-semibold">
                        유의사항
                    </CommonText>
                    <ul className="mx-5 text-sm list-disc">
                        <li className="mx-5 text-[#686868]">
                            스타벅스 카드 충전은 1회 1만원부터 55만원까지 가능하며, 하루에 최대 55만원까지 충전할 수
                            있습니다.
                        </li>
                        <li className="mx-5 text-[#686868]">
                            계정당 스타벅스 카드 잔액 보유 한도는 200만원을 초과할 수 없습니다.
                        </li>
                    </ul>
                </div>
            </div>
            <div className="absolute left-0 right-0 w-full  bottom-[70px] px-5 pt-3 pb-5 shadow-[0_-2px_3px_-1px_rgba(0,0,0,0.3)] border">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-[#98714E]">충전 후 예상 총 카드 잔액</p>
                    <p className="text-2xl font-semibold">{selectedUnit.toLocaleString()}원</p>
                </div>
                <CommonBtn fullWidth={true} bgColor="bg-[#01A862]" title="충전하기" textColor="text-white" />
            </div>
            <ChargeModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setSelectedUnit={setSelectedUnit}
                modifyCustomUnitValue={modifyCustomUnitValue}
            />
        </CommonLayout>
    );
}

export default Charge;
