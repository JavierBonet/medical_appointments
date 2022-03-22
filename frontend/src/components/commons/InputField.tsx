import React from 'react';

interface PropsInterface {
  label: string;
  type: 'text' | 'number';
  name: string;
  value: number | string | undefined;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  label,
  type,
  name,
  value,
  changeHandler,
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
    </>
  );
};

export default InputField;
