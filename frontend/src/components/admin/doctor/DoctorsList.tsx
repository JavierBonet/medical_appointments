import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

interface PropsInterface {
  doctors: Doctor[];
  deleteHandler: (id: number) => void;
}

const DoctorsList = ({ doctors, deleteHandler }: PropsInterface) => {
  return (
    <Table celled padded columns={6}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Surname</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Age</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Speciality</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" colSpan="2">
            Actions
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {doctors.map((doctor) => {
          return (
            <Table.Row key={doctor.id}>
              <Table.Cell textAlign="center">{doctor.name}</Table.Cell>
              <Table.Cell textAlign="center">{doctor.surname}</Table.Cell>
              <Table.Cell textAlign="center">{doctor.age}</Table.Cell>
              <Table.Cell textAlign="center">{doctor.speciality}</Table.Cell>
              <Table.Cell textAlign="center" selectable>
                <Link to={`../doctor/${doctor.id}`}>Edit</Link>
              </Table.Cell>
              <Table.Cell
                className="delete-button"
                onClick={() => deleteHandler(doctor.id)}
                textAlign="center"
              >
                Delete
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default DoctorsList;
