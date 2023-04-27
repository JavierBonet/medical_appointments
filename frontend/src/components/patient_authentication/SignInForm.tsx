import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import InputField from '../commons/InputField';

interface PropsInterface {
  patient: LoginPatient;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitHandler: () => void;
}

const SignInForm = ({ patient, changeHandler, submitHandler }: PropsInterface) => {
  return (
    <Form onSubmit={submitHandler}>
      <Form.Field>
        <InputField
          id={'patient-email'}
          label="Email"
          type="email"
          name="email"
          value={patient.email}
          changeHandler={changeHandler}
        />
      </Form.Field>
      <Form.Field>
        <InputField
          id={'patient-password'}
          label="Password"
          type="password"
          name="password"
          value={patient.password}
          changeHandler={changeHandler}
        />
      </Form.Field>
      <Button positive type="submit">
        Log in
      </Button>
    </Form>
  );
};

export default SignInForm;
