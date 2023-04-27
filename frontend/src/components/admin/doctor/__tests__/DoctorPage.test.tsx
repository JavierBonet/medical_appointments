import React, { ReactElement } from 'react';
import { useParams, Routes, Route, MemoryRouter } from 'react-router-dom';
import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ToastContainer } from 'react-toastify';
import { getDoctor, saveDoctor } from '../../../../api/admin/doctors';
import {
  areAvailableHospitals,
  getCalendar,
  getCalendars,
  saveCalendar,
  getAvailableHospitals,
  deleteCalendar,
} from '../../../../api/admin/calendars';
import { getDays } from '../../../../api/admin/days';
import { createCalendar, createDoctor, createHospital } from '../../__tests__/utils/factory';
import DoctorPage from '../DoctorPage';
import CalendarPage from '../calendar/CalendarPage';
import CalendarsPage from '../calendar/CalendarsPage';

function render(ui: ReactElement, ...options: any[]) {
  function Wrapper() {
    return (
      <>
        <MemoryRouter initialEntries={['/doctor/4']}>
          <Routes>
            <Route path="doctor/:doctorId" element={ui}>
              <Route index element={<CalendarsPage />} />
              <Route path="calendar/:calendarId" element={<CalendarPage />} />
              <Route path="calendar" element={<CalendarPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
        <ToastContainer />
      </>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: () => mockedNavigate,
}));

const mockedUseParams = jest.mocked(useParams);

jest.mock('../../../../api/admin/doctors');
jest.mock('../../../../api/admin/calendars');
jest.mock('../../../../api/admin/days');

jest.mock('../../../commons/CustomLoader', () => () => <div>Loading</div>);

const mockedSaveDoctor = jest.mocked(saveDoctor);
const mockedGetDoctor = jest.mocked(getDoctor);

const mockedSaveCalendar = jest.mocked(saveCalendar);
const mockedDeleteCalendar = jest.mocked(deleteCalendar);
const mockedGetCalendar = jest.mocked(getCalendar);
const mockedGetCalendars = jest.mocked(getCalendars);
const mockedAreAvailableHospitals = jest.mocked(areAvailableHospitals);
const mockedGetAvailableHospitals = jest.mocked(getAvailableHospitals);

const mockedGetDays = jest.mocked(getDays);

const mockLogout = jest.fn();

describe('DoctorPage', () => {
  describe('when renders', () => {
    it('should allow to create a doctor ', async () => {
      const successMessage = 'Doctor created successfully';
      mockedSaveDoctor.mockResolvedValue(successMessage);
      mockedUseParams.mockReturnValue({});
      mockedGetCalendars.mockResolvedValue([]);
      mockedAreAvailableHospitals.mockResolvedValue(false);

      const name = 'Josh';
      const surname = 'Mcwire';
      const age = '50';
      const speciality = 'Dermatologist';

      render(<DoctorPage logout={mockLogout} />);

      const nameField = screen.getByLabelText('Name');
      const surnameField = screen.getByLabelText('Surname');
      const ageField = screen.getByLabelText('Age');
      const specialtyField = screen.getByLabelText('Speciality');

      await userEvent.type(nameField, name);
      await userEvent.type(surnameField, surname);
      await userEvent.type(ageField, age);
      await userEvent.type(specialtyField, speciality);

      const createButton = screen.getByRole('button', { name: /create/i });

      await userEvent.click(createButton);

      const toast = await screen.findByText(successMessage);

      expect(mockedSaveDoctor).toHaveBeenCalledTimes(1);
      expect(mockedSaveDoctor).toHaveBeenCalledWith({ name, surname, age, speciality, Calendars: [] });
      expect(mockedNavigate).toHaveBeenCalledTimes(1);
      expect(mockedNavigate).toHaveBeenCalledWith('../doctors');
      expect(toast).toBeInTheDocument();
    });

    describe('when the doctor exists', () => {
      const doctorId = '4';
      const doctor = createDoctor(parseInt(doctorId));
      beforeEach(() => {
        mockedUseParams.mockReturnValue({ doctorId });
        mockedGetDoctor.mockResolvedValue(doctor);
        mockedSaveDoctor.mockClear();
      });

      it("should show the doctor's data", async () => {
        mockedGetCalendars.mockResolvedValue([]);
        mockedAreAvailableHospitals.mockResolvedValue(false);

        render(<DoctorPage logout={mockLogout} />);

        const doctorFullName = `${doctor.name} ${doctor.surname}`;
        const header = await screen.findByRole('heading', { name: doctorFullName });
        const nameField = await screen.findByLabelText('Name');
        const surnameField = await screen.findByLabelText('Surname');
        const ageField = await screen.findByLabelText('Age');
        const specialtyField = await screen.findByLabelText('Speciality');

        expect(header).toBeInTheDocument();
        expect(nameField).toHaveValue(doctor.name);
        expect(surnameField).toHaveValue(doctor.surname);
        expect(ageField).toHaveValue(doctor.age);
        expect(specialtyField).toHaveValue(doctor.speciality);
      });

      it('should allow to update the doctor', async () => {
        const successMessage = 'Doctor updated successfully';
        mockedSaveDoctor.mockResolvedValue(successMessage);
        mockedGetCalendars.mockResolvedValue([]);
        mockedAreAvailableHospitals.mockResolvedValue(false);

        render(<DoctorPage logout={mockLogout} />);

        const nameField = await screen.findByLabelText('Name');
        const specialtyField = await screen.findByLabelText('Speciality');

        const newName = 'Edward';
        const newSpecialty = 'Traumatologist';

        await userEvent.clear(nameField);
        await userEvent.clear(specialtyField);

        await userEvent.type(nameField, newName);
        await userEvent.type(specialtyField, newSpecialty);

        const doctorFullName = `${newName} ${doctor.surname}`;

        const header = await screen.findByRole('heading', { name: doctorFullName });

        expect(header).toBeInTheDocument();

        const updateButton = screen.getByRole('button', { name: /update/i });

        await userEvent.click(updateButton);

        const toast = await screen.findByText(successMessage);

        expect(toast).toBeInTheDocument();
        expect(saveDoctor).toHaveBeenCalledTimes(1);
        expect(saveDoctor).toHaveBeenCalledWith({ ...doctor, name: newName, speciality: newSpecialty });
      });

      it('should allow creating a calendar and show error messages when leaving fields blank', async () => {
        const successMessage = 'Calendar created successfully';
        const hospital1 = createHospital({});
        const hospital2 = createHospital({});
        mockedGetCalendars.mockResolvedValue([]);
        mockedSaveCalendar.mockResolvedValue(successMessage);
        mockedAreAvailableHospitals.mockResolvedValue(true);
        mockedGetAvailableHospitals.mockResolvedValue([hospital1, hospital2]);

        render(<DoctorPage logout={mockLogout} />);

        const newCalendarButton = await screen.findByRole('link', { name: 'New calendar' });

        await userEvent.click(newCalendarButton);

        await screen.findByRole('heading', { name: 'New calendar' });

        const createButton = screen.getByRole('button', { name: 'Create' });

        await userEvent.click(createButton);

        const nameErrorMessage = 'You should set a name';
        const hospitalErrorMessage = 'A hospital should be selected';

        expect(await screen.findByText(nameErrorMessage)).toBeInTheDocument();
        expect(await screen.findByText(hospitalErrorMessage)).toBeInTheDocument();

        const nameFields = await screen.findAllByLabelText('Name');
        const nameField = nameFields[1];
        const hospitalField = screen.getByTestId('hospitalId');

        const calendarName = 'My calendar';
        await userEvent.type(nameField, calendarName);
        await userEvent.click(hospitalField);
        const hospitalOption = screen.getByRole('option', { name: hospital1.name });
        await userEvent.click(hospitalOption);

        expect(screen.queryByText(nameErrorMessage)).not.toBeInTheDocument();
        expect(screen.queryByText(hospitalErrorMessage)).not.toBeInTheDocument();

        await userEvent.click(createButton);

        const toast = await screen.findByText(successMessage);

        expect(toast).toBeInTheDocument();

        const hospitalId = hospital1.id;
        const expectedCalendar = { name: calendarName, doctorId: parseInt(doctorId), hospitalId };
        expect(mockedSaveCalendar).toHaveBeenCalledTimes(1);
        expect(mockedSaveCalendar).toHaveBeenCalledWith(doctorId, expectedCalendar, hospitalId);
      });

      describe('when doctor has calendars', () => {
        const hospital = createHospital({});
        const calendar = createCalendar({ doctor, hospital });
        beforeEach(() => {
          const otherHospital = createHospital({});
          mockedGetCalendars.mockResolvedValue([calendar]);
          mockedGetCalendar.mockResolvedValue(calendar);
          mockedAreAvailableHospitals.mockResolvedValue(true);
          mockedGetAvailableHospitals.mockResolvedValue([hospital, otherHospital]);
          mockedUseParams.mockReturnValue({ doctorId, calendarId: calendar.id.toString() });
          mockedSaveCalendar.mockClear();
        });

        it(`should show its calendars`, async () => {
          render(<DoctorPage logout={mockLogout} />);

          const calendarsHeader = await screen.findByRole('heading', {
            name: 'Calendars',
          });
          const calendarName = await screen.findByRole('cell', {
            name: calendar.name,
          });
          const doctorName = await screen.findByRole('cell', {
            name: `${calendar.Doctor.name} ${calendar.Doctor.surname}`,
          });
          const hospitalName = await screen.findByRole('cell', {
            name: calendar.Hospital.name,
          });

          expect(calendarsHeader).toBeInTheDocument();
          expect(calendarName).toBeInTheDocument();
          expect(doctorName).toBeInTheDocument();
          expect(hospitalName).toBeInTheDocument();
        });

        it('should allow updating a calendar', async () => {
          const successMessage = 'Calendar updated successfully';
          mockedSaveCalendar.mockResolvedValue(successMessage);
          mockedGetDays.mockResolvedValue([]);

          render(<DoctorPage logout={mockLogout} />);

          const editButton = await screen.findByRole('link', { name: /edit/i });

          await userEvent.click(editButton);

          const nameField = await screen.findByLabelText('Name');

          const newCalendarName = 'New calendar name';
          await userEvent.clear(nameField);
          await userEvent.type(nameField, newCalendarName);

          const updateButton = await screen.findByRole('button', { name: /update/i });

          await userEvent.click(updateButton);

          const toast = await screen.findByText(successMessage);

          expect(toast).toBeInTheDocument();

          expect(mockedSaveCalendar).toHaveBeenCalledTimes(1);
          expect(mockedSaveCalendar).toHaveBeenCalledWith(doctorId, { ...calendar, name: newCalendarName }, undefined);
        });

        it('should allow deleting a calendar  ', async () => {
          const successMessage = 'Calendar deleted successfully';
          mockedDeleteCalendar.mockResolvedValue(successMessage);
          window.confirm = jest.fn().mockResolvedValue(true);

          render(<DoctorPage logout={mockLogout} />);

          const deleteButton = await screen.findByRole('cell', { name: /delete/i });

          await userEvent.click(deleteButton);

          const noCalendarsMessage = await screen.findByRole('heading', {
            name: 'No Calendars available',
          });

          expect(noCalendarsMessage).toBeInTheDocument();
          expect(deleteCalendar).toHaveBeenCalledTimes(1);
          expect(deleteCalendar).toHaveBeenCalledWith(doctorId, calendar.id);
        });
      });

      describe("when doctor doesn't have calendars", () => {
        it('should show "No Calendars available"', async () => {
          mockedGetCalendars.mockResolvedValue([]);
          mockedAreAvailableHospitals.mockResolvedValue(true);

          render(<DoctorPage logout={mockLogout} />);

          const calendarsHeader = await screen.findByRole('heading', {
            name: 'No Calendars available',
          });

          expect(calendarsHeader).toBeInTheDocument();
        });
      });
    });

    describe('when the calendar exists', () => {
      it('should show the calendar page', async () => {});
    });
  });
});
// should allow to create a doctor
// when the doctor exists
//   should show the doctor's data
//   should allow to update the doctor
//   should show doctor's calendars if he/she has
//   should show 'No Calendars available' if there are no calendars
//   should allow creating a calendar and show error messages when leaving fields blank
//   should allow updating a calendar
//   should allow deleting a calendar
// when the calendar exists
//   should show the calendar page
