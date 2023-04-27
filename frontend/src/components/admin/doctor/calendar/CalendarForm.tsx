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
  errors: CalendarErrors;
}

const CalendarForm = ({
  calendar,
  hospitalOptions,
  changeHandler,
  selectChangeHandler,
  saveHandler,
  errors,
}: PropsInterface) => {
  return (
    <Form onSubmit={saveHandler}>
      <Form.Field required>
        <InputField
          id={'calendar-name'}
          label="Name"
          type="text"
          name="name"
          value={calendar.name}
          changeHandler={changeHandler}
          error={errors.name}
        />
      </Form.Field>
      <Form.Field required>
        <SelectInputField
          id="hospitalId"
          label="Hospital"
          selected={calendar.hospitalId}
          options={hospitalOptions}
          changeHandler={(id: number) => selectChangeHandler('hospitalId', id)}
          error={errors.hospitalId}
        />
      </Form.Field>

      <Button positive type="submit">
        {calendar.id ? 'Update' : 'Create'}
      </Button>
    </Form>
  );
};

export default CalendarForm;
