import React, { ReactElement } from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { render as rtlRender, screen } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SignInPage from '../patient_authentication/SignInPage';
import SignUpPage from '../patient_authentication/SignUpPage';
import { doesPatientAlreadyExist, login, savePatient } from '../../api/patients';
import App from '../../App';
import PatientHomePage from '../patient/PatientHomePage';

jest.mock('../../api/patients');
const mockedLogin = jest.mocked(login);
const mockedDoesPatientAlreadyExist = jest.mocked(doesPatientAlreadyExist);
const mockedSavePatient = jest.mocked(savePatient);

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
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={ui} />
            <Route path="/patient" element={<PatientHomePage user={user} logout={mockPatientLogout} />}>
              <Route path="signin" element={<SignInPage user={user} setUser={setUser} />} />
              <Route path="signup" element={<SignUpPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
        <ToastContainer />
      </>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

describe('App', () => {
  describe('when renders', () => {
    it('should show the page heading', async () => {
      render(<App user={undefined} logout={mockPatientLogout} />, undefined, jest.fn());

      const heading = await screen.findByRole('heading', { name: /medical appointments web site/i });
      expect(heading).toBeInTheDocument();
    });

    const email = 'fakeEmail@example.com';
    const password = 'fakePassword123';

    describe('and the user is logged in', () => {
      const user = { email };

      it('should show the header links and log out button', async () => {
        render(<App user={user} logout={mockPatientLogout} />, user, jest.fn());

        const mainLink = await screen.findByRole('link', { name: /appointments/i });
        const buttons = screen.getAllByRole('button');
        const logoutButton = buttons.find((button) => button.getAttribute('class') === 'logout-button');

        expect(mainLink).toBeInTheDocument();
        expect(logoutButton).toBeInTheDocument();
      });

      it('should allow to log out', () => {
        // COMPLETE
      });
    });

    describe('and the user is not logged in', () => {
      beforeEach(() => {
        mockedDoesPatientAlreadyExist.mockClear();
        mockedNavigate.mockClear();
      });

      const user = undefined;

      it('should show header links', async () => {
        render(<App user={user} logout={mockPatientLogout} />, user, jest.fn());

        const mainLink = await screen.findByRole('link', { name: /my info/i });
        const links = screen.getAllByRole('link');
        const signUpLink = links.find((link) => link.getAttribute('href') === '/patient/signup') as HTMLElement;
        const signInLink = links.find((link) => link.getAttribute('href') === '/patient/signin') as HTMLElement;

        expect(mainLink).toBeInTheDocument();
        expect(signUpLink).toBeInTheDocument();
        expect(signUpLink).toHaveAttribute('href', '/patient/signup');
        expect(signInLink).toBeInTheDocument();
        expect(signInLink).toHaveAttribute('href', '/patient/signin');
      });

      describe('when the user tries to sign up', () => {
        describe('and the user does not exist', () => {
          it('should allow to sign up', async () => {
            const successMessage = 'User created successfully';
            mockedDoesPatientAlreadyExist.mockResolvedValue(false);
            mockedSavePatient.mockResolvedValue(successMessage);

            render(<App user={user} logout={mockPatientLogout} />, user, jest.fn());

            const links = await screen.findAllByRole('link');
            const signUpLink = links.find((link) => link.getAttribute('href') === '/patient/signup') as HTMLElement;

            await userEvent.click(signUpLink);

            const emailField = await screen.findByLabelText(/email/i);
            const passwordField = screen.getByLabelText('Password');
            const passwordConfirmationField = screen.getByLabelText(/password confirmation/i);

            await userEvent.type(emailField, email);
            await userEvent.type(passwordField, password);
            await userEvent.type(passwordConfirmationField, password);

            const createUserButton = screen.getByRole('button', { name: /create user/i });

            await userEvent.click(createUserButton);

            const toast = await screen.findByText(successMessage);

            expect(toast).toBeInTheDocument();
            expect(mockedDoesPatientAlreadyExist).toHaveBeenCalledTimes(1);
            expect(mockedDoesPatientAlreadyExist).toHaveBeenCalledWith(email);
            expect(mockedSavePatient).toHaveBeenCalledTimes(1);
            expect(mockedSavePatient).toHaveBeenCalledWith({ email, password });
          });
        });

        describe('and the credentials already exist', () => {
          it('should show an error message', async () => {
            const errorMessage = 'Patient already registered. Please log in';
            mockedDoesPatientAlreadyExist.mockResolvedValue(true);

            render(<App user={user} logout={mockPatientLogout} />, user, jest.fn());

            const links = await screen.findAllByRole('link');
            const signUpLink = links.find((link) => link.getAttribute('href') === '/patient/signup') as HTMLElement;

            await userEvent.click(signUpLink);

            const emailField = await screen.findByLabelText(/email/i);
            const passwordField = screen.getByLabelText('Password');
            const passwordConfirmationField = screen.getByLabelText(/password confirmation/i);

            await userEvent.type(emailField, email);
            await userEvent.type(passwordField, password);
            await userEvent.type(passwordConfirmationField, password);

            const createUserButton = screen.getByRole('button', { name: /create user/i });

            await userEvent.click(createUserButton);

            const toast = await screen.findByText(errorMessage);

            expect(toast).toBeInTheDocument();
            expect(mockedDoesPatientAlreadyExist).toHaveBeenCalledTimes(1);
            expect(mockedDoesPatientAlreadyExist).toHaveBeenCalledWith(email);
            expect(mockedNavigate).toHaveBeenCalledTimes(1);
            expect(mockedNavigate).toHaveBeenCalledWith('/patient/signin');
          });
        });
      });

      describe('when the user tries to sign in', () => {
        beforeEach(() => {
          mockedLogin.mockClear();
        });

        describe('and provides valid credentials', () => {
          it('should allow to sign in', async () => {
            const successMessage = 'Logged in successfully';
            mockedLogin.mockResolvedValue(true);

            render(<App user={user} logout={mockPatientLogout} />, user, jest.fn());

            const links = await screen.findAllByRole('link');
            const signInLink = links.find((link) => link.getAttribute('href') === '/patient/signin') as HTMLElement;

            await userEvent.click(signInLink);

            const loginHeader = await screen.findByRole('heading', { name: /log in/i });
            expect(loginHeader).toBeInTheDocument();

            const emailField = await screen.findByLabelText(/email/i);
            const passwordField = screen.getByLabelText('Password');

            await userEvent.type(emailField, email);
            await userEvent.type(passwordField, password);

            const loginButton = screen.getByRole('button', { name: /log in/i });

            await userEvent.click(loginButton);

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
            const errorMessage = 'Email or password are wrong';
            mockedLogin.mockResolvedValue(false);

            render(<App user={user} logout={mockPatientLogout} />, user, jest.fn());

            const links = await screen.findAllByRole('link');
            const signInLink = links.find((link) => link.getAttribute('href') === '/patient/signin') as HTMLElement;

            await userEvent.click(signInLink);

            const loginHeader = await screen.findByRole('heading', { name: /log in/i });
            expect(loginHeader).toBeInTheDocument();

            const emailField = await screen.findByLabelText(/email/i);
            const passwordField = screen.getByLabelText('Password');

            await userEvent.type(emailField, email);
            await userEvent.type(passwordField, password);

            const loginButton = screen.getByRole('button', { name: /log in/i });

            await userEvent.click(loginButton);

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
