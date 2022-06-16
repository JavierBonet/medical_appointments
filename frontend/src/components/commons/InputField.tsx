import React from 'react';

interface PropsInterface {
  label: string;
  type: React.HTMLInputTypeAttribute;
  name: string;
  value: number | string | undefined;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField = ({
  label,
  type,
  name,
  value,
  changeHandler,
  error,
}: PropsInterface) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => changeHandler(e)}
      />
      {error && <div className="error-message">{error}</div>}
    </>
  );
};

export default InputField;
