import React from 'react';

interface PropsInterface {
  id: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  name: string;
  value: number | string | undefined;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField = ({ id, label, type, name, value, changeHandler, error }: PropsInterface) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} name={name} value={value} onChange={(e) => changeHandler(e)} />
      {error && <div className="error-message">{error}</div>}
    </>
  );
};

export default InputField;
