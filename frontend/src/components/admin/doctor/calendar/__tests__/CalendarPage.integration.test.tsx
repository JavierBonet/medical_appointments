import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { useParams, useNavigate } from 'react-router-dom';
import { getCalendar, getAvailableHospitals } from '../../../../../api/admin/calendars';
import userEvent from '@testing-library/user-event';
import CalendarPage from '../CalendarPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

const mockUseParams = jest.mocked(useParams);
const mockUseNavigate = jest.mocked(useNavigate);

jest.mock('../../../../../api/admin/calendars', () => ({
  getCalendar: jest.fn(),
  saveCalendar: jest.fn(),
  getAvailableHospitals: jest.fn(),
}));

const mockGetCalendar = jest.mocked(getCalendar);
const mockGetAvailableHospitals = jest.mocked(getAvailableHospitals);

jest.mock('../day/ConfigureDays', () => () => <div>Days configuration</div>);

const doctorId = '1';

const calendarId = '10';

const doctor1: Doctor = {
  id: 1,
  name: 'Marc',
  surname: 'Rodriguez',
  speciality: 'Dermatologist',
  Calendars: [],
};
const hospital1: Hospital = {
  id: 1,
  name: 'H1',
  address: '1234',
  phone: '124124124',
  zip_code: 2000,
};

const calendarName = 'C1';
const calendar: Calendar = {
  id: parseInt(calendarId),
  name: calendarName,
  doctorId: doctor1.id,
  hospitalId: hospital1.id,
  Days: [],
  Doctor: doctor1,
  Hospital: hospital1,
};

describe('CalendarPage', () => {
  describe('when renders', () => {
    describe('and there is a current calendar', () => {
      beforeAll(() => {
        mockUseParams.mockReturnValue({ doctorId, calendarId });
        mockUseNavigate.mockReturnValue(jest.fn());
        mockGetCalendar.mockResolvedValue({ ...calendar });
      });

      beforeEach(() => {
        mockGetCalendar.mockClear();
        mockGetAvailableHospitals.mockClear();
      });

      const hospital2: Hospital = {
        id: 2,
        name: 'H2',
        address: 'Riverside 143',
        phone: '85412566',
        zip_code: 2003,
      };

      const hospitals: Hospital[] = [hospital2];

      it('should show calendar name as header and a form with its data', async () => {
        // Arrange
        mockGetAvailableHospitals.mockResolvedValue([...hospitals]);

        // Act
        await act(async () => {
          render(<CalendarPage />);
        });

        const header = screen.getByRole('heading', { name: calendarName });
        const nameField = screen.getByLabelText(/name/i);
        const hospitalField = screen.getByRole('option', {
          name: calendar.Hospital.name,
          selected: true,
        });

        // Assert
        expect(header).toBeInTheDocument();
        expect(nameField.getAttribute('value')).toBe(calendar.name);
        expect(hospitalField).toBeInTheDocument();
      });

      describe('and all the form fields are set', () => {
        describe('when the user clicks the save button', () => {
          describe('and there are errors', () => {
            it('should show the errors', async () => {
              // Act
              await act(async () => {
                render(<CalendarPage />);
              });

              const nameInput = await screen.findByLabelText(/Name/i);

              await act(async () => {
                // First we set to a valid value
                await userEvent.type(nameInput, 'C1');
                // and then we set it to an invalid one in order to get the errors
                await userEvent.clear(nameInput);
              });

              const nameError = await screen.findByText(/You should set a name/i);

              // Assert
              expect(nameError).toBeInTheDocument();
            });
          });
        });
      });

      it('should show days configuration', async () => {
        // Arrange
        mockGetCalendar.mockResolvedValue({ ...calendar });
        mockGetAvailableHospitals.mockResolvedValue([]);

        // Act
        await act(async () => {
          render(<CalendarPage />);
        });

        const daysConfiguration = screen.getByText('Days configuration');

        // Assert
        expect(daysConfiguration).toBeInTheDocument();
      });
    });

    describe('and there is no current calendar', () => {
      beforeAll(() => {
        mockUseParams.mockReturnValue({ doctorId });
      });

      beforeEach(() => {
        mockGetAvailableHospitals.mockReset();
        mockGetAvailableHospitals.mockResolvedValue([]);
      });

      it('should show the new calendar heading and an empty form', async () => {
        // Act
        await act(async () => {
          render(<CalendarPage />);
        });

        const header = screen.getByRole('heading', { name: /New calendar/i });
        const nameInput = screen.getByLabelText(/name/i);
        const hospitalInput = screen.getByTestId('hospitalId').querySelector('input');

        // Assert
        expect(header).toBeInTheDocument();
        expect(nameInput.getAttribute('value')).toBe('');
        expect(hospitalInput?.getAttribute('value')).toBe('');
      });
    });

    describe('when user modifies the name', () => {
      beforeAll(() => {
        mockUseParams.mockReturnValue({ doctorId, calendarId });
        mockGetCalendar.mockResolvedValue({ ...calendar });
        mockGetAvailableHospitals.mockResolvedValue([]);
      });

      it('should change the header', async () => {
        // Arrange
        const newName = 'Calendar 4';

        // Act
        await act(async () => {
          render(<CalendarPage />);
        });

        const nameInput = await screen.findByLabelText(/Name/i);

        await act(async () => {
          await userEvent.clear(nameInput);
          await userEvent.type(nameInput, newName);
        });

        const header = screen.getByRole('heading', { name: newName });

        // Assert
        expect(header).toBeInTheDocument();
      });
    });
  });
});
