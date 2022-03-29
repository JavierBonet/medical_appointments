import React from 'react';
import { Dropdown } from 'semantic-ui-react';

interface PropsInterface {
  label: string;
  name: string;
  selected?: number;
  options: { key: number; value: number; text: string }[];
  changeHandler: (id: number) => void;
  removeLabel?: boolean;
}

const SelectInputField = ({
  label,
  name,
  selected,
  options,
  changeHandler,
  removeLabel,
}: PropsInterface) => {
  return (
    <>
      {!removeLabel && <label htmlFor={name}>{label}</label>}
      <Dropdown
        placeholder={label}
        fluid
        search
        selection
        value={selected}
        options={options}
        onChange={(_, data) => changeHandler(data.value as number)}
      />
    </>
  );
};

export default SelectInputField;
