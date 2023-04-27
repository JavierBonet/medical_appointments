import React from 'react';
import { Dropdown } from 'semantic-ui-react';

interface PropsInterface {
  id: string;
  label: string;
  selected?: number;
  options: { key: number; value: number; text: string }[];
  changeHandler: (id: number) => void;
  removeLabel?: boolean;
  error?: string;
}

const SelectInputField = ({ id, label, selected, options, changeHandler, removeLabel, error }: PropsInterface) => {
  return (
    <>
      {!removeLabel && <label htmlFor={id}>{label}</label>}
      <Dropdown
        id={id}
        data-testid={id}
        placeholder={label}
        fluid
        search
        selection
        value={selected}
        options={options}
        onChange={(_, data) => changeHandler(data.value as number)}
      />
      {error && <div className="error-message">{error}</div>}
    </>
  );
};

export default SelectInputField;
