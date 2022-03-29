import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import InputField from '../../../commons/InputField';
import SelectInputField from '../../../commons/SelectInputField';

interface PropsInterface {
  calendar: OptionalCalendar;
  hospitalOptions: { key: number; value: number; text: string }[];
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectChangeHandler: (field: string, id: number) => void;
  saveHandler: () => void;
}

const CalendarForm = ({
  calendar,
  hospitalOptions,
  changeHandler,
  selectChangeHandler,
  saveHandler,
}: PropsInterface) => {
  return (
    <Form onSubmit={() => saveHandler()}>
      <Form.Field>
        <InputField
          label="Name"
          type="text"
          name="name"
          value={calendar.name}
          changeHandler={changeHandler}
        />
      </Form.Field>
      <Form.Field>
        <SelectInputField
          label="Hospital"
          name="hospitalId"
          selected={calendar.hospitalId}
          options={hospitalOptions}
          changeHandler={(id: number) => selectChangeHandler('hospitalId', id)}
        />
      </Form.Field>

      <Button positive type="submit">
        {calendar.id ? 'Update' : 'Create'}
      </Button>
    </Form>
  );
};

export default CalendarForm;
