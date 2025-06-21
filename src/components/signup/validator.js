export const validateField = (name, value, errors) => {
    const newErrors = { ...errors };

    switch (name) {
        case 'name':
            if (!value.trim()) newErrors.name = '이름을 입력해주세요.';
            else delete newErrors.name;
            break;
        case 'nickname':
            if (!value.trim()) newErrors.nickname = '닉네임을 입력해주세요.';
            else if (value.length < 2) newErrors.nickname = '닉네임은 2자 이상이어야 합니다.';
            else delete newErrors.nickname;
            break;
        case 'email':
            if (!value) newErrors.email = '이메일을 입력해주세요.';
            else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = '유효한 이메일 주소를 입력해주세요.';
            else delete newErrors.email;
            break;
        case 'password':
            if (!value) newErrors.password = '비밀번호를 입력해주세요.';
            else if (value.length < 6) newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
            else delete newErrors.password;
            break;
        default:
            break;
    }

    return { newErrors, isValid: !newErrors[name] };
};

export const validateForm = (formData, validateFieldFn) => {
    const errors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
        const { newErrors, isValid: fieldIsValid } = validateFieldFn(field, formData[field], {});
        Object.assign(errors, newErrors);
        if (!fieldIsValid) isValid = false;
    });

    return { errors, isValid };
};
