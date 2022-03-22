import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import InputField from '../../commons/InputField';

interface PropsInterface {
  doctor: OptionalDoctor;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  saveHandler: () => void;
}

const DoctorForm = ({ doctor, changeHandler, saveHandler }: PropsInterface) => {
  return (
    <Form onSubmit={() => saveHandler()}>
      <Form.Field>
        <InputField
          label="Name"
          type="text"
          name="name"
          value={doctor.name}
          changeHandler={changeHandler}
        />
      </Form.Field>
      <Form.Field>
        <InputField
          label="Surname"
          type="text"
          name="surname"
          value={doctor.surname}
          changeHandler={changeHandler}
        />
      </Form.Field>
      <Form.Field>
        <InputField
          label="Age"
          type="number"
          name="age"
          value={doctor.age}
          changeHandler={changeHandler}
        />
      </Form.Field>
      <Form.Field>
        <InputField
          label="Speciality"
          type="text"
          name="speciality"
          value={doctor.speciality}
          changeHandler={changeHandler}
        />
      </Form.Field>

      <Button positive type="submit">
        {doctor.id ? 'Update' : 'Create'}
      </Button>
    </Form>
  );
};

export default DoctorForm;
