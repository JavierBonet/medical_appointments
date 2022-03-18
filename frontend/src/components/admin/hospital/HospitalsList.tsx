import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Table } from 'semantic-ui-react';

interface PropsInterface {
  hospitals: Hospital[];
}

const HospitalsList = ({ hospitals }: PropsInterface) => {
  return (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Address</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Phone</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Zip code</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" colSpan="2"></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {hospitals.map((hospital) => {
          return (
            <Table.Row key={hospital.id}>
              <Table.Cell textAlign="center">{hospital.name}</Table.Cell>
              <Table.Cell textAlign="center">{hospital.address}</Table.Cell>
              <Table.Cell textAlign="center">{hospital.phone}</Table.Cell>
              <Table.Cell textAlign="center">{hospital.zip_code}</Table.Cell>
              <Table.Cell textAlign="center" selectable>
                <Link to="/admin">Edit</Link>
              </Table.Cell>
              <Table.Cell textAlign="center">Delete</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default HospitalsList;
