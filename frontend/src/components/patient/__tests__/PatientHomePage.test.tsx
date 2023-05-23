import { type ReactElement } from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { render as rtlRender, screen } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import PatientAuthRoute from '../../../routes/PatientAuthRoute';
import AppointmentsPage from '../appointment/AppointmentsPage';
import SignInPage from '../../patient_authentication/SignInPage';
import AppointmentPage from '../appointment/AppointmentPage';
import { getAppointments, getPatientAppointments, saveAppointment, deleteAppointment } from '../../../api/appointments';
import { createAppointment } from './utils/factory';
import { getHospitals } from '../../../api/hospitals';
import { createCalendar, createDoctor, createHospital } from '../../admin/__tests__/utils/factory';
import { getCalendarByDoctorAndHospitalId } from '../../../api/calendars';
import { login } from '../../../api/patients';
import PatientHomePage from '../PatientHomePage';

jest.mock('../../../api/appointments');
const mockedGetPatientAppointments = jest.mocked(getPatientAppointments);
const mockedGetAppointments = jest.mocked(getAppointments);
const mockedSaveAppointment = jest.mocked(saveAppointment);
const mockedDeleteAppointment = jest.mocked(deleteAppointment);

jest.mock('../../../api/hospitals');
const mockedGetHospitals = jest.mocked(getHospitals);

jest.mock('../../../api/calendars');
const mockedGetCalendarByDoctorAndHospitalId = jest.mocked(getCalendarByDoctorAndHospitalId);

jest.mock('../../../api/patients');
const mockedLogin = jest.mocked(login);

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

const mockPatientLogout = jest.fn();

function render(
  ui: ReactElement,
  user: LocalStorageUser | undefined,
  setUser: (adminUser: LocalStorageUser) => void,
  ...options: any[]
) {
  function Wrapper() {
    return (
      <>
        <MemoryRouter initialEntries={['/patient']}>
          <Routes>
            <Route path="/patient" element={ui}>
              <Route element={<PatientAuthRoute user={user} redirectPath="signin" />}>
                <Route index element={<AppointmentsPage logout={mockPatientLogout} />} />
                <Route path="appointment/:appointmentId" element={<AppointmentPage logout={mockPatientLogout} />} />
                <Route path="appointment" element={<AppointmentPage logout={mockPatientLogout} />} />
              </Route>
              <Route path="signin" element={<SignInPage user={user} setUser={setUser} />} />
            </Route>
          </Routes>
        </MemoryRouter>
        <ToastContainer />
      </>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

describe('PatientHomePage', () => {
  describe('when renders', () => {
    it('should show header links', async () => {
      render(<PatientHomePage user={undefined} logout={mockPatientLogout} />, undefined, jest.fn());

      const homeLink = await screen.findByRole('link', { name: /home/i });
      const appointmentsLink = await screen.findByRole('link', { name: /appointments/i });

      expect(homeLink).toBeInTheDocument();
      expect(appointmentsLink).toBeInTheDocument();
    });

    const email = 'fakeEmail@example.com';
    const password = 'fakePassword123';

    describe('and the user is logged in', () => {
      beforeEach(() => {
        mockedGetPatientAppointments.mockClear();
        mockedNavigate.mockClear();
      });

      const user = { email };

      it("should show the user's appointments", async () => {
        const appointment1 = createAppointment({});
        const appointment2 = createAppointment({});
        mockedGetPatientAppointments.mockResolvedValue([appointment1, appointment2]);

        render(<PatientHomePage user={user} logout={mockPatientLogout} />, user, jest.fn());

        const appointmentsHeader = await screen.findByRole('heading', { name: /my appointments/i });
        const hospitalTableHeader = await screen.findByRole('columnheader', { name: /hospital/i });
        const doctorTableHeader = screen.getByRole('columnheader', { name: /doctor/i });
        const dateTableHeader = screen.getByRole('columnheader', { name: /date/i });
        const hourTableHeader = screen.getByRole('columnheader', { name: /hour/i });
        const hospitalName = screen.getByRole('cell', { name: appointment1.Hospital.name });
        const doctorFullName = screen.getByRole('cell', {
          name: `${appointment1.Doctor.name} ${appointment1.Doctor.surname}`,
        });

        expect(appointmentsHeader).toBeInTheDocument();
        expect(hospitalTableHeader).toBeInTheDocument();
        expect(doctorTableHeader).toBeInTheDocument();
        expect(dateTableHeader).toBeInTheDocument();
        expect(hourTableHeader).toBeInTheDocument();
        expect(hospitalName).toBeInTheDocument();
        expect(doctorFullName).toBeInTheDocument();
        expect(mockedGetPatientAppointments).toHaveBeenCalledTimes(1);
      });

      it('should allow to create an appointment', async () => {
        mockedGetPatientAppointments.mockResolvedValue([]);
        const doctor1 = createDoctor();
        const doctor2 = createDoctor();
        const doctor3 = createDoctor();
        const hospital1 = createHospital({ doctors: [doctor1, doctor2] });
        const hospital2 = createHospital({ doctors: [doctor2, doctor3] });
        mockedGetHospitals.mockResolvedValue([hospital1, hospital2]);
        const hospitalToSelect = hospital1;
        const doctorToSelect = doctor2;
        const calendar = createCalendar({ hospital: hospitalToSelect, doctor: doctorToSelect });
        mockedGetCalendarByDoctorAndHospitalId.mockResolvedValue(calendar);
        mockedGetAppointments.mockResolvedValue([]);
        window.confirm = jest.fn().mockReturnValue(true);

        const { container } = render(<PatientHomePage user={user} logout={mockPatientLogout} />, user, jest.fn());

        // When clicking the new appointment button, it should show the appointment page
        const newAppointmentButton = await screen.findByRole('link', { name: /new appointment/i });

        await userEvent.click(newAppointmentButton);

        // When selecting the hospital and doctor fields, it should show the calendar to select a date
        const hospitalField = await screen.findByTestId('hospitalId');

        await userEvent.click(hospitalField);

        const hospitalOption = await screen.findByRole('option', { name: hospitalToSelect.name });

        await userEvent.click(hospitalOption);

        const doctorField = await screen.findByTestId('doctorId');

        await userEvent.click(doctorField);

        const doctorOption = await screen.findByRole('option', {
          name: `${doctorToSelect.name} ${doctorToSelect.surname}`,
        });

        await userEvent.click(doctorOption);

        const mondayHeader = await screen.findByText('M');
        expect(mondayHeader).toBeInTheDocument();

        const dates = container.querySelectorAll('.calendar-date:not(.disabled)');
        const appointmentDay = dates[0];
        const dateNumber = appointmentDay.textContent as string;

        await userEvent.click(appointmentDay);

        // When selecting a date, it should show the available appointment hours to select one
        const today = new Date();
        const monthNumber = today.getMonth() + 1;
        const month = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
        const fullYear = today.getFullYear();

        const hourSelectionHeader = await screen.findByRole('heading', { name: `${fullYear}-${month}-${dateNumber}` });
        expect(hourSelectionHeader).toBeInTheDocument();

        const hours = container.querySelectorAll('.hour:not(.disabled)');
        const appointmentHour = hours[0];
        const hour = appointmentHour.textContent as string;

        await userEvent.click(appointmentHour);

        const appointment = createAppointment({ dateNumber, hour });
        mockedSaveAppointment.mockResolvedValue(appointment);

        const saveButton = screen.getByRole('button', { name: /save/i });

        await userEvent.click(saveButton);

        // When clicking the save button, it should call the corresponding methods
        const successMessage = `Appointment successfully created for ${appointment.date} at ${appointment.hour}`;
        const toast = await screen.findByText(successMessage);
        const expectedAppointment = {
          date: appointment.date,
          hour,
          dayOfTheWeek: appointment.dayOfTheWeek,
          doctorId: doctorToSelect.id,
          hospitalId: hospitalToSelect.id,
        };

        expect(toast).toBeInTheDocument();
        expect(mockedGetPatientAppointments).toHaveBeenCalledTimes(1);
        expect(mockedGetHospitals).toHaveBeenCalledTimes(1);
        expect(mockedGetHospitals).toHaveBeenCalledWith(true);
        expect(mockedGetCalendarByDoctorAndHospitalId).toHaveBeenCalledTimes(1);
        expect(mockedGetCalendarByDoctorAndHospitalId).toHaveBeenCalledWith(doctorToSelect.id, hospitalToSelect.id);
        expect(mockedGetAppointments).toHaveBeenCalledTimes(2);
        expect(mockedGetAppointments).toHaveBeenNthCalledWith(1, hospitalToSelect.id, doctorToSelect.id);
        expect(mockedGetAppointments).toHaveBeenNthCalledWith(2, hospitalToSelect.id, doctorToSelect.id);
        expect(mockedSaveAppointment).toHaveBeenCalledTimes(1);
        expect(mockedSaveAppointment).toHaveBeenCalledWith(expectedAppointment);
        expect(mockedNavigate).toHaveBeenCalledTimes(1);
        expect(mockedNavigate).toHaveBeenCalledWith('/patient');
      });

      it('should allow to delete an appointment', async () => {
        const appointment1 = createAppointment({});
        const appointment2 = createAppointment({});
        mockedGetPatientAppointments.mockResolvedValue([appointment1, appointment2]);
        const successMessage = 'Appointment deleted successfully';
        mockedDeleteAppointment.mockResolvedValue(successMessage);

        render(<PatientHomePage user={user} logout={mockPatientLogout} />, user, jest.fn());

        const deleteButtons = await screen.findAllByRole('cell', { name: /delete/i });
        const firstDeleteButton = deleteButtons[0];

        await userEvent.click(firstDeleteButton);

        const toast = await screen.findByText(successMessage);

        expect(toast).toBeInTheDocument();
        expect(mockedGetPatientAppointments).toHaveBeenCalledTimes(1);
        expect(deleteAppointment).toHaveBeenCalledTimes(1);
        expect(deleteAppointment).toHaveBeenCalledWith(appointment1.id);
      });
    });

    describe('and the user is not logged in', () => {
      beforeEach(() => {
        mockedLogin.mockClear();
      });

      const user = undefined;

      describe('when the user tries to log in', () => {
        describe('and provides valid credentials', () => {
          it('should allow to sign in', async () => {
            mockedLogin.mockResolvedValue(true);

            render(<PatientHomePage user={user} logout={mockPatientLogout} />, user, jest.fn());

            const loginHeader = await screen.findByRole('heading', { name: /log in/i });
            expect(loginHeader).toBeInTheDocument();

            const emailField = screen.getByLabelText(/email/i);
            const passwordField = screen.getByLabelText(/password/i);

            await userEvent.type(emailField, email);
            await userEvent.type(passwordField, password);

            const loginButton = screen.getByRole('button', { name: /log in/i });

            await userEvent.click(loginButton);

            const successMessage = 'Logged in successfully';
            const toast = await screen.findByText(successMessage);

            expect(toast).toBeInTheDocument();
            expect(mockedLogin).toHaveBeenCalledTimes(1);
            expect(mockedLogin).toHaveBeenCalledWith({ email, password });
            expect(mockedNavigate).toHaveBeenCalledTimes(1);
            expect(mockedNavigate).toHaveBeenCalledWith('/patient');
          });
        });

        describe('and the provided credentials are not valid', () => {
          it('should show an error message', async () => {
            mockedLogin.mockResolvedValue(false);

            render(<PatientHomePage user={user} logout={mockPatientLogout} />, user, jest.fn());

            const loginHeader = await screen.findByRole('heading', { name: /log in/i });
            expect(loginHeader).toBeInTheDocument();

            const emailField = screen.getByLabelText(/email/i);
            const passwordField = screen.getByLabelText(/password/i);

            await userEvent.type(emailField, email);
            await userEvent.type(passwordField, password);

            const loginButton = screen.getByRole('button', { name: /log in/i });

            await userEvent.click(loginButton);

            const errorMessage = 'Email or password are wrong';
            const toast = await screen.findByText(errorMessage);

            expect(toast).toBeInTheDocument();
            expect(mockedLogin).toHaveBeenCalledTimes(1);
            expect(mockedLogin).toHaveBeenCalledWith({ email, password });
          });
        });
      });
    });
  });
});
