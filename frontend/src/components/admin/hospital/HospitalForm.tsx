import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import InputField from '../../commons/InputField';

interface PropsInterface {
  hospital: OptionalHospital;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  saveHandler: () => void;
}

const HospitalForm = ({ hospital, changeHandler, saveHandler }: PropsInterface) => {
  return (
    <Form onSubmit={() => saveHandler()}>
      <Form.Field>
        <InputField
          id={'hospital-name'}
          label="Name"
          type="text"
          name="name"
          value={hospital.name}
          changeHandler={changeHandler}
        />
      </Form.Field>
      <Form.Field>
        <InputField
          id={'hospital-address'}
          label="Address"
          type="text"
          name="address"
          value={hospital.address}
          changeHandler={changeHandler}
        />
      </Form.Field>
      <Form.Field>
        <InputField
          id={'hospital-phone'}
          label="Phone"
          type="text"
          name="phone"
          value={hospital.phone}
          changeHandler={changeHandler}
        />
      </Form.Field>
      <Form.Field>
        <InputField
          id={'hospital-zip-code'}
          label="Zip code"
          type="number"
          name="zip_code"
          value={hospital.zip_code}
          changeHandler={changeHandler}
        />
      </Form.Field>
      <Button positive type="submit">
        {hospital.id ? 'Update' : 'Create'}
      </Button>
    </Form>
  );
};

export default HospitalForm;
