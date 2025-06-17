import { useState } from 'react';
import { CommonHeader } from '../../components/common/customHeader';
import { CommonText } from '../../components/common/customText';
import { CommonTextInput } from '../../components/common/TextInput';
import CommonLayout from '../../layouts/CommonLayout';

function NickName() {
    const [value, setValue] = useState('사용자닉네임');
    const [error, setError] = useState(false);

    const onFocusHandler = () => {
        if (error) {
            setError(false);
        }
    };

    const onChangeHandler = (e) => {
        setValue(e.target.value);
        console.log(value);
    };

    const onBlurHandler = () => {
        if (!/^[가-힣]+$/.test(value)) {
            setError(true);
        }
    };

    return (
        <CommonLayout>
            <CommonHeader
                title="닉네임 설정"
                onBack={() => window.history.back()}
                className="shadow-[0_2px_3px_-1px_rgba(0,0,0,0.3)]"
            />
            <div className="mx-5 mt-5">
                <CommonText>닉네임을 입력해주세요. (한글 최대 6자)</CommonText>
                <div className="flex gap-1 mt-3">
                    <input
                        type="text"
                        value={value}
                        maxLength={6}
                        onFocus={onFocusHandler}
                        onChange={onChangeHandler}
                        onBlur={onBlurHandler}
                        className="px-3 border border-[#D8D8D8] rounded-md basis-3/4"
                    />
                    <button
                        className="px-4 text-white border rounded-md h-11 basis-1/4 border-starbucks-green bg-starbucks-green disabled:border-[#E0E0E0] disabled:bg-[#E0E0E0]"
                        disabled={error}
                    >
                        저장하기
                    </button>
                </div>
                <label className={`${error ? 'visible' : 'hidden'} text-xs font-medium text-red-500`}>
                    닉네임은 한글 기준 최대 6자로 구성되어야합니다.
                </label>

                <InAppropriateNicknameNotice />
            </div>
        </CommonLayout>
    );
}

const InAppropriateNicknameNotice = () => {
    return (
        <div className="mt-5 text-[#808080]">
            <CommonText fontSize="font-semibold" className="mb-3">
                부적절한 닉네임
            </CommonText>
            <ul className="text-sm list-inside">
                <li className="custom-bullet">
                    자사는 매장을 이용하는 고객님들과 호명하는 파트너의 입장을 고려하여 부적절한 닉네임 사용을 제한하고
                    있습니다.
                </li>
                <li className="custom-bullet">
                    부적절한 닉네임을 입력하는 경우 관리자에 의해 예고 없이 사용중지 될 수 있습니다.
                </li>
                <li className="custom-bullet">
                    부적절한 닉네임 기준을 아래에 안내해드립니다.
                    <ul className="list-inside list-[lower-alpha] ps-4">
                        <li>미풍양속 및 사회통념에 어긋나는 부적절한 표현</li>
                        <li>욕설/음란성/혐오성 단어나 비속어를 사용하여 타인을 직접적으로 비방하는 표현</li>
                        <li>
                            매장 파트너가 콜링 시 혼란을 줄 수 있는 표현
                            <ul className="list-inside ps-4">
                                <li className="custom-bullet">
                                    주문/제공 관련 단어 등 영업에 방해가 될 수 있는 표현 (예. 라떼시키신분, 매장내모든
                                    등)
                                </li>
                                <li className="custom-bullet">
                                    스타벅스에서 판매 중 또는 판매했던 메뉴명/재료명, 음료 사이즈명, 서비스명을 포함한
                                    단어
                                </li>
                                <li className="custom-bullet">타사(메뉴)명을 포함한 단어</li>
                            </ul>
                        </li>
                        <li>
                            매장 파트너가 콜링하기 곤란한 표현
                            <ul className="list-inside ps-4">
                                <li className="custom-bullet">
                                    발음하기 어렵거나 부르기 곤란한 단어 (예. 줄훍줄훍, 옴뇸뇸뇸냠 등)
                                </li>
                            </ul>
                        </li>
                        <li>위에 언급된 것 외에 매장에서 호명하는 파트너와 듣는 고객들에게 불쾌감을 줄 수 있는 표현</li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default NickName;
