import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonBtn } from '../../common/customBtn';
import { validateField, validateForm } from './validator';
import FormFields from './FormFields';
import TermsAgreement from './TermsAgreement';
import AuthService from '../../../services/AuthService';

const SignupForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        nickname: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const { newErrors } = validateField(name, value, errors);
        setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { errors: validationErrors, isValid } = validateForm(formData, validateField);
        setErrors(validationErrors);

        if (isValid) {
            setIsSubmitting(true);
            try {
                const result = await AuthService.signup(formData);
                alert(result.message);
                // 회원가입 성공 시 로그인 페이지로 이동
                navigate('/login');
            } catch (error) {
                console.error('회원가입 실패:', error);
                alert(error.message || '회원가입 중 오류가 발생했습니다.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <FormFields formData={formData} errors={errors} handleChange={handleChange} handleBlur={handleBlur} />

            <TermsAgreement />

            <div className="pt-2">
                <CommonBtn
                    type="submit"
                    title={isSubmitting ? '처리 중...' : '가입하기'}
                    bgColor="bg-green-600 hover:bg-green-700"
                    textColor="text-white"
                    fullWidth={true}
                    className="py-3 text-base font-medium transition-colors duration-200"
                    disabled={isSubmitting}
                />
            </div>
        </form>
    );
};

export default SignupForm;
