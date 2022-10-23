import React from 'react';
import { Table } from 'semantic-ui-react';

interface PropsInterface {
  appointments: Appointment[];
  deleteHandler: (id: number) => void;
}

function AppointmentsList({ appointments, deleteHandler }: PropsInterface) {
  return (
    <Table celled padded columns={5}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Hospital</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Doctor</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Date</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Hour</Table.HeaderCell>
          <Table.HeaderCell textAlign="center" colSpan="1" />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {appointments.map((appointment) => {
          return (
            <Table.Row key={appointment.id}>
              <Table.Cell textAlign="center">
                {appointment.Hospital.name}
              </Table.Cell>
              <Table.Cell textAlign="center">{`${appointment.Doctor.name} ${appointment.Doctor.surname}`}</Table.Cell>
              <Table.Cell textAlign="center">{appointment.date}</Table.Cell>
              <Table.Cell textAlign="center">{appointment.hour}</Table.Cell>
              <Table.Cell
                className="delete-button"
                onClick={() => deleteHandler(appointment.id)}
                textAlign="center"
              >
                Cancel
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

export default AppointmentsList;
