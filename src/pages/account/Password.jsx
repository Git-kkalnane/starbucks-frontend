import { useState } from 'react';
import { CommonHeader } from '../../components/common/customHeader';
import { CommonText } from '../../components/common/customText';
import CommonLayout from '../../layouts/CommonLayout';
import { CommonBtn } from '../../components/common/customBtn';

function Password() {
    const [email, setEmail] = useState('user0123@gmail.com');

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState('');

    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
    const [validPasswordError, setValidPasswordError] = useState(false);

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const passwordFieldChangeHandler = (e) => {
        setPassword(e.target.value);
    };

    const passwordValidFieldChangeHandler = (e) => {
        setValidPassword(e.target.value);
    };

    const passwordFieldBlurHandler = () => {
        if (password.length === 0) {
            return;
        } else if (password.length < 10 || password.length > 20) {
            setPasswordError(true);
            setPasswordErrorMsg('10~20자리 이내로 입력해 주세요.');
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]+$/.test(password)) {
            setPasswordError(true);
            setPasswordErrorMsg('숫자와 영문을 혼합해 주세요.');
        } else {
            setPasswordError(false);
        }
    };

    const passwordValidFieldBlurHandler = () => {
        if (!passwordError && password !== validPassword && validPassword !== '') {
            setValidPasswordError(true);
            setButtonDisabled(true);
        } else if (password === validPassword && validPassword.length !== 0) {
            setValidPasswordError(false);
            setButtonDisabled(false);
        } else {
            setValidPasswordError(false);
        }
    };

    return (
        <CommonLayout className="relative">
            <CommonHeader />
            <div className="mx-8 mt-5">
                <TitleMessage email={email} />
                <InputField
                    onChangeHandler={passwordFieldChangeHandler}
                    onBlurHandler={passwordFieldBlurHandler}
                    value={password}
                    error={passwordError}
                    errorMessage={passwordErrorMsg}
                    placeholder="새 비밀번호 (10~20자리 이내)"
                />
                <InputField
                    onChangeHandler={passwordValidFieldChangeHandler}
                    onBlurHandler={passwordValidFieldBlurHandler}
                    value={validPassword}
                    error={validPasswordError}
                    errorMessage="비밀번호가 일치하지 않습니다."
                    placeholder="새 비밀번호 확인"
                />
            </div>
            <div className="w-full h-80 bg-[#F5F5F5] absolute bottom-[100px] px-8 pt-8 text-[#676767]">
                <CommonText fontSize="text-lg" weight="font-semibold" className="mb-1">
                    안전한 비밀번호 만들기
                </CommonText>
                <ul className="px-4 text-sm list-disc">
                    <li>영문, 숫자 혼합하여 10~20자리 이내로 입력하세요.</li>
                    <li>
                        아이디와 같은 비밀번호, 생일, 학번, 전화번호 등 개인정보와 관련된 숫자, 동일하게 반복된 숫자 등
                        다른 사람이 쉽게 알아낼 수 있는 비밀번호는 유출 위험이 높아 사용하지 않는 것이 좋습니다.
                    </li>
                    <li>
                        이전에 사용하셨던 비밀번호를 재사용할 경우 도용의 우려가 있으니, 가급적 새로운 비밀번호를 사용해
                        주세요.
                    </li>
                </ul>
            </div>
            <div className="absolute left-0 right-0 w-full bg-white bottom-[66px] px-5 py-5 border">
                <CommonBtn
                    className="disabled:bg-[#E0E0E0] disabled:border-[#E0E0E0]"
                    fullWidth={true}
                    bgColor="bg-[#01A862]"
                    title="확인"
                    textColor="text-white"
                    onClick={() => console.log('클릭')}
                    disabled={buttonDisabled}
                    weight="font-normal"
                />
            </div>
        </CommonLayout>
    );
}

const TitleMessage = ({ email }) => {
    return (
        <div className="mb-5">
            <CommonText fontSize="text-2xl" className="font-semibold">
                <span className="text-starbucks-green">{email}</span>님의
            </CommonText>
            <CommonText fontSize="text-2xl" weight="font-semibold">
                비밀번호를 변경합니다
            </CommonText>
        </div>
    );
};

const InputField = ({ onChangeHandler, onBlurHandler, value, error, errorMessage, placeholder }) => {
    return (
        <div>
            <input
                type="password"
                className={`w-full border-b border-[#E0E0E0] px-2 py-5 focus:outline-none focus:border-[#00A862]`}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                value={value}
                placeholder={placeholder}
            />
            <label className={`${error ? 'visible' : 'hidden'} text-xs font-medium text-red-500`}>{errorMessage}</label>
        </div>
    );
};

export default Password;
