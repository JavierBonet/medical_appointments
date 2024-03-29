import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import InputField from '../../commons/InputField';

interface PropsInterface {
  adminUser: OptionalPatient;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitHandler: () => void;
  errors: PatientErrors;
}

const SignUpForm = ({
  adminUser: { email, password, passwordConfirmation },
  changeHandler,
  submitHandler,
  errors,
}: PropsInterface) => {
  return (
    <Form onSubmit={() => submitHandler()}>
      <InputField
        id={'admin-user-email'}
        label="Email"
        type="text"
        name="email"
        value={email}
        changeHandler={changeHandler}
        error={errors.email}
      />
      <InputField
        id={'admin-user-password'}
        label="Password"
        type="password"
        name="password"
        value={password}
        changeHandler={changeHandler}
        error={errors.password}
      />
      <InputField
        id={'admin-user-password-confirmation'}
        label="Password confirmation"
        type="password"
        name="passwordConfirmation"
        value={passwordConfirmation}
        changeHandler={changeHandler}
        error={errors.passwordConfirmation}
      />
      <Button positive type="submit">
        Create user
      </Button>
    </Form>
  );
};

export default SignUpForm;
