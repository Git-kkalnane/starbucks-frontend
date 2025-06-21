const TermsAgreement = () => {
  return (
    <div className="flex items-start mt-6 mb-6">
      <div className="flex items-center h-5">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="w-4 h-4 border border-gray-300 rounded focus:ring-green-500 text-green-600"
          required
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="terms" className="text-gray-600">
          <span className="font-medium">이용약관</span> 및{' '}
          <span className="font-medium">개인정보 수집 및 이용</span>에 동의합니다.
        </label>
        <p className="text-xs text-gray-500 mt-1">
          회원가입을 진행하시면 개인정보 처리방침 및 이용약관에 동의하시는 것으로 간주됩니다.
        </p>
      </div>
    </div>
  );
};

export default TermsAgreement;
