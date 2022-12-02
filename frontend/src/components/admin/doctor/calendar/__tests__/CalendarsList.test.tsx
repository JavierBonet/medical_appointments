import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CalendarsList from '../CalendarsList';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: (props: { to: string }) => <a href={props.to}>Edit</a>,
}));

interface PropsInterface {
  calendars: Calendar[];
  deleteHandler: (id: number) => void;
}

const mockDeleteHandler = jest.fn();

const defaultProps: PropsInterface = {
  calendars: [],
  deleteHandler: mockDeleteHandler,
};

const propsWithCalendars: PropsInterface = {
  ...defaultProps,
  calendars: [
    {
      id: 1,
      name: 'C1',
      doctorId: 2,
      hospitalId: 3,
      Doctor: {
        id: 2,
        name: 'John',
        surname: 'Doe',
        age: 43,
        speciality: 'Dermatologist',
        Calendars: [],
      },
      Hospital: {
        id: 3,
        name: 'HECA',
        address: 'Fake address 123',
        phone: '12314123',
        zip_code: 2000,
        Doctors: [],
      },
      Days: [],
    },
  ],
};

describe('CalendarList', () => {
  describe('when there are no calendars', () => {
    it('should just render the headers', () => {
      // Act
      render(<CalendarsList {...defaultProps} />);

      // Assert
      const nameHeader = screen.getByRole('columnheader', { name: 'Name' });
      const doctorHeader = screen.getByRole('columnheader', {
        name: 'Doctor',
      });
      const hospitalHeader = screen.getByRole('columnheader', {
        name: 'Hospital',
      });
      const actionsHeader = screen.getByRole('columnheader', {
        name: 'Actions',
      });

      expect(nameHeader).toBeInTheDocument();
      expect(doctorHeader).toBeInTheDocument();
      expect(hospitalHeader).toBeInTheDocument();
      expect(actionsHeader).toBeInTheDocument();
    });
  });

  describe('when there are calendars', () => {
    it('should render the headers and table content', () => {
      // Act
      render(<CalendarsList {...propsWithCalendars} />);

      // Assert
      const nameHeader = screen.getByRole('columnheader', { name: 'Name' });
      const doctorHeader = screen.getByRole('columnheader', {
        name: 'Doctor',
      });
      const hospitalHeader = screen.getByRole('columnheader', {
        name: 'Hospital',
      });
      const actionsHeader = screen.getByRole('columnheader', {
        name: 'Actions',
      });

      const calendarName = screen.getByRole('cell', { name: 'C1' });
      const doctorName = screen.getByRole('cell', { name: 'John Doe' });
      const hospitalName = screen.getByRole('cell', { name: 'HECA' });

      // Headers
      expect(nameHeader).toBeInTheDocument();
      expect(doctorHeader).toBeInTheDocument();
      expect(hospitalHeader).toBeInTheDocument();
      expect(actionsHeader).toBeInTheDocument();

      // Table content
      expect(calendarName).toBeInTheDocument();
      expect(doctorName).toBeInTheDocument();
      expect(hospitalName).toBeInTheDocument();
    });

    describe('when user clicks on the delete button', () => {
      it('should execute call the delete method', async () => {
        // Act
        render(<CalendarsList {...propsWithCalendars} />);

        const deleteButton = screen.getByRole('cell', { name: 'Delete' });

        await userEvent.click(deleteButton);

        // Assert
        expect(mockDeleteHandler).toHaveBeenCalled();
      });
    });
  });
});
