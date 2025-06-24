import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CommonBtn } from '../../common/customBtn';
import { validateField, validateForm } from './validator';
import FormFields from './FormFields';
import TermsAgreement from './TermsAgreement';

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
        console.log(`name: ${name}, ${value}`);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const { errors: validationErrors, isValid } = validateForm(formData, validateField);
        setErrors(validationErrors);

        if (isValid) {
            setIsSubmitting(true);
            // TODO: Implement signup logic here
            console.log('Form submitted:', formData);
            // Reset form after submission
            setFormData({
                name: '',
                nickname: '',
                email: '',
                password: '',
            });
            setIsSubmitting(false);
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
