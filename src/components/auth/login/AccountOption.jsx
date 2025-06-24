import React from 'react';

function AccountOptions({
    onFindAccountClick,
    checkboxLabel = '아이디 저장',
    findAccountText = '아이디/비밀번호 찾기',
    className = '',
}) {
    return (
        <div className={`flex justify-between items-center ${className}`}>
            <label className="flex items-center">
                <input type="checkbox" className="rounded text-green-600" />
                <span className="ml-2 text-sm">{checkboxLabel}</span>
            </label>
            <button type="button" className="text-sm text-green-600 hover:underline" onClick={onFindAccountClick}>
                {findAccountText}
            </button>
        </div>
    );
}

export default AccountOptions;
