import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

interface PropsInterface {
  calendars: Calendar[];
  deleteHandler: (id: number) => void;
}

const CalendarsList = ({ calendars, deleteHandler }: PropsInterface) => {
  return (
    <Table celled padded columns={6}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Doctor</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Hospital</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" colSpan="2">
            Actions
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {calendars.map((calendar) => {
          return (
            <Table.Row key={calendar.id}>
              <Table.Cell textAlign="center">{calendar.name}</Table.Cell>
              <Table.Cell textAlign="center">{`${calendar.Doctor.name} ${calendar.Doctor.surname}`}</Table.Cell>
              <Table.Cell textAlign="center">
                {calendar.Hospital.name}
              </Table.Cell>
              <Table.Cell textAlign="center" selectable>
                <Link to={`../calendar/${calendar.id}`}>Edit</Link>
              </Table.Cell>
              <Table.Cell
                className="delete-button"
                onClick={() => deleteHandler(calendar.id)}
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

export default CalendarsList;
