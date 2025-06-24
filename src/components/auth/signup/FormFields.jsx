import { CommonTextInput } from '../../common/TextInput';

const FormFields = ({ formData, errors, handleChange, handleBlur }) => {
    return (
        <>
            {/* Name Field */}
            <CommonTextInput
                name="name"
                type="text"
                placeholder="이름"
                containerClassName="mb-1"
                onChange={handleChange}
                onBlur={handleBlur}
                value={formData.name}
                hasError={!!errors.name}
                required
            />
            {errors.name && <p className="text-red-500 text-xs mb-3 -mt-1">{errors.name}</p>}

            {/* Nickname Field */}
            <CommonTextInput
                name="nickname"
                type="text"
                placeholder="닉네임 (2자 이상)"
                containerClassName="mb-1 mt-4"
                onChange={handleChange}
                onBlur={handleBlur}
                value={formData.nickname}
                hasError={!!errors.nickname}
                required
                maxLength={12}
            />
            {errors.nickname && <p className="text-red-500 text-xs mb-3 -mt-1">{errors.nickname}</p>}

            {/* Email Field */}
            <CommonTextInput
                name="email"
                type="email"
                placeholder="이메일"
                containerClassName="mb-1 mt-4"
                onChange={handleChange}
                onBlur={handleBlur}
                value={formData.email}
                hasError={!!errors.email}
                required
                autoComplete="username"
            />
            {errors.email && <p className="text-red-500 text-xs mb-3 -mt-1">{errors.email}</p>}

            {/* Password Field */}
            <CommonTextInput
                name="password"
                type="password"
                placeholder="비밀번호 (6자 이상)"
                containerClassName="mb-1 mt-4"
                onChange={handleChange}
                onBlur={handleBlur}
                value={formData.password}
                hasError={!!errors.password}
                required
                autoComplete="new-password"
            />
            {errors.password && <p className="text-red-500 text-xs mb-3 -mt-1">{errors.password}</p>}
        </>
    );
};

export default FormFields;
