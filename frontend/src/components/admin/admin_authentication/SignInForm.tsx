import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import InputField from '../../commons/InputField';

interface PropsInterface {
  currentUser: LoginAdminUser;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitHandler: () => void;
}

const SignInForm = ({
  currentUser,
  changeHandler,
  submitHandler,
}: PropsInterface) => {
  return (
    <Form onSubmit={submitHandler}>
      <Form.Field>
        <InputField
          label="Email"
          type="email"
          name="email"
          value={currentUser.email}
          changeHandler={changeHandler}
        />
      </Form.Field>
      <Form.Field>
        <InputField
          label="Password"
          type="password"
          name="password"
          value={currentUser.password}
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
