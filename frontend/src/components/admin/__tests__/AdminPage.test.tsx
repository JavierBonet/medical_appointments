import React, { ReactElement } from 'react';
import { useParams, Routes, Route, MemoryRouter, useNavigate } from 'react-router-dom';
import { render as rtlRender, screen, within } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AdminPage from '../AdminPage';
import AdminAuthRoute from '../../../routes/AdminAuthRoute';
import AdminHome from '../AdminHome';
import HospitalsPage from '../hospital/HospitalsPage';
import DoctorsPage from '../doctor/DoctorsPage';
import { default as AdminSignInPage } from '../admin_authentication/SignInPage';
import { default as AdminSignUpPage } from '../admin_authentication/SignUpPage';
import { doesAdminUserAlreadyExist, login, saveAdminUser } from '../../../api/admin/user';
import App from '../../../App';

jest.mock('../hospital/HospitalsPage', () => () => <h1>Hospitals</h1>);
jest.mock('../doctor/DoctorsPage', () => () => <h1>Doctors</h1>);

jest.mock('../../../api/admin/user');

const mockedLogin = jest.mocked(login);
const mockedDoesAdminUserAlreadyExist = jest.mocked(doesAdminUserAlreadyExist);
const mockedSaveAdminUser = jest.mocked(saveAdminUser);

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const clear = jest.fn();
const getItem = jest.fn();
const setItem = jest.fn();
const removeItem = jest.fn();
const key = jest.fn();

window.localStorage = {
  clear,
  getItem,
  setItem,
  removeItem,
  key,
  length: 3,
};

const mockAdminLogout = jest.fn();

function render(
  ui: ReactElement,
  adminUser: LocalStorageAdminUser | undefined,
  setAdminUser: (adminUser: LocalStorageAdminUser) => void,
  ...options: any[]
) {
  function Wrapper() {
    return (
      <>
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route path="/" element={<App user={undefined} logout={jest.fn()} />} />
            <Route path="/admin" element={ui}>
              <Route element={<AdminAuthRoute adminUser={adminUser} redirectPath="signin" />}>
                <Route index element={<AdminHome />} />
                <Route path="hospitals" element={<HospitalsPage logout={mockAdminLogout} />} />
                <Route path="doctors" element={<DoctorsPage logout={mockAdminLogout} />} />
              </Route>
              <Route path="signin" element={<AdminSignInPage adminUser={adminUser} setAdminUser={setAdminUser} />} />
              <Route path="signup" element={<AdminSignUpPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
        <ToastContainer />
      </>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

describe('AdminPage', () => {
  describe('when renders', () => {
    beforeEach(() => {
      mockNavigate.mockClear();
    });

    const email = 'fakeEmail@example.com';
    const password = 'fakePassword123';

    describe('and the user is not logged in', () => {
      const adminUser = undefined;

      it('should show the login page', async () => {
        render(<AdminPage adminUser={adminUser} logout={mockAdminLogout} />, adminUser, jest.fn());

        const homeLink = await screen.findByRole('link', { name: 'Home' });
        const loginPageHeader = await screen.findByRole('heading', { name: 'Admin log in' });
        const emailField = screen.getByLabelText(/email/i);
        const passwordField = screen.getByLabelText(/password/i);
        const links = screen.getAllByRole('link');
        const signUpLink = links.find((link) => link.getAttribute('href') === '/admin/signup') as HTMLElement;
        const signInLink = links.find((link) => link.getAttribute('href') === '/admin/signin') as HTMLElement;

        expect(homeLink).toBeInTheDocument();
        expect(loginPageHeader).toBeInTheDocument();
        expect(emailField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();
        expect(signUpLink).toHaveAttribute('href', '/admin/signup');
        expect(signInLink).toHaveAttribute('href', '/admin/signin');
      });

      describe('when user tries to login with valid credentials', () => {
        it('should allow to sign in', async () => {
          mockedLogin.mockResolvedValue(true);
          const mockSetAdminUser = jest.fn();
          const successMessage = 'Logged in successfully';

          render(<AdminPage adminUser={adminUser} logout={mockAdminLogout} />, adminUser, mockSetAdminUser);

          const emailField = await screen.findByLabelText(/email/i);
          const passwordField = await screen.findByLabelText(/password/i);

          await userEvent.type(emailField, email);
          await userEvent.type(passwordField, password);

          const loginButton = screen.getByRole('button', { name: 'Log in' });

          await userEvent.click(loginButton);

          const toast = await screen.findByText(successMessage);

          expect(toast).toBeInTheDocument();
          expect(mockSetAdminUser).toHaveBeenCalledTimes(1);
          expect(mockSetAdminUser).toHaveBeenCalledWith({ name: email });
          expect(mockNavigate).toHaveBeenCalledTimes(1);
          expect(mockNavigate).toHaveBeenCalledWith('/admin');
        });
      });

      describe('when user tries to login with invalid credentials', () => {
        it('should not allow to sign in and show an error message', async () => {
          mockedLogin.mockResolvedValue(false);
          const errorMessage = 'Username or password are wrong';

          render(<AdminPage adminUser={adminUser} logout={mockAdminLogout} />, adminUser, jest.fn());

          const emailField = await screen.findByLabelText(/email/i);
          const passwordField = await screen.findByLabelText(/password/i);

          await userEvent.type(emailField, email);
          await userEvent.type(passwordField, password);

          const loginButton = screen.getByRole('button', { name: 'Log in' });

          await userEvent.click(loginButton);

          const toast = await screen.findByText(errorMessage);

          expect(toast).toBeInTheDocument();
        });
      });

      describe('when the user tries to sign up', () => {
        beforeEach(() => {
          mockedDoesAdminUserAlreadyExist.mockClear();
        });

        describe('and the user does not exist', () => {
          it('should allow to sign up', async () => {
            mockedDoesAdminUserAlreadyExist.mockResolvedValue(false);
            const successMessage = 'Sign up successfully';
            mockedSaveAdminUser.mockResolvedValue(successMessage);

            render(<AdminPage adminUser={adminUser} logout={mockAdminLogout} />, adminUser, jest.fn());

            const links = await screen.findAllByRole('link');
            const signUpLink = links.find((link) => link.getAttribute('href') === '/admin/signup') as HTMLElement;

            await userEvent.click(signUpLink);

            const emailField = await screen.findByLabelText(/email/i);
            const passwordField = screen.getByLabelText('Password');
            const passwordConfirmation = screen.getByLabelText(/password confirmation/i);

            await userEvent.type(emailField, email);
            await userEvent.type(passwordField, password);
            await userEvent.type(passwordConfirmation, password);

            const createButton = screen.getByRole('button', { name: /create user/i });

            await userEvent.click(createButton);

            const toast = await screen.findByText(successMessage);
            const expectedAdminUser = { email, password };

            expect(mockedDoesAdminUserAlreadyExist).toHaveBeenCalledTimes(1);
            expect(mockedDoesAdminUserAlreadyExist).toHaveBeenCalledWith(email);
            expect(mockedSaveAdminUser).toHaveBeenCalledTimes(1);
            expect(mockedSaveAdminUser).toHaveBeenCalledWith(expectedAdminUser);
            expect(toast).toBeInTheDocument();
            expect(mockNavigate).toHaveBeenCalledTimes(1);
            expect(mockNavigate).toHaveBeenCalledWith('/admin');
          });
        });

        describe('and the user exists', () => {
          it('should show error message and redirect to sign in page', async () => {
            mockedDoesAdminUserAlreadyExist.mockResolvedValue(true);
            const errorMessage = 'Admin user already registered. Please log in';

            render(<AdminPage adminUser={adminUser} logout={mockAdminLogout} />, adminUser, jest.fn());

            const links = await screen.findAllByRole('link');
            const signUpLink = links.find((link) => link.getAttribute('href') === '/admin/signup') as HTMLElement;

            await userEvent.click(signUpLink);

            const emailField = await screen.findByLabelText(/email/i);
            const passwordField = screen.getByLabelText('Password');
            const passwordConfirmation = screen.getByLabelText(/password confirmation/i);

            await userEvent.type(emailField, email);
            await userEvent.type(passwordField, password);
            await userEvent.type(passwordConfirmation, password);

            const createButton = screen.getByRole('button', { name: /create user/i });

            await userEvent.click(createButton);

            const toast = await screen.findByText(errorMessage);

            expect(mockedDoesAdminUserAlreadyExist).toHaveBeenCalledTimes(1);
            expect(mockedDoesAdminUserAlreadyExist).toHaveBeenCalledWith(email);
            expect(toast).toBeInTheDocument();
            expect(mockNavigate).toHaveBeenCalledTimes(1);
            expect(mockNavigate).toHaveBeenCalledWith('/admin/signin');
          });
        });
      });
    });

    describe('and the user is logged in', () => {
      const adminUser = { name: email };

      it('should show the navigation buttons', async () => {
        render(<AdminPage adminUser={adminUser} logout={mockAdminLogout} />, adminUser, jest.fn());

        const heading = await screen.findByRole('heading', { name: /welcome/i });
        const homeButton = screen.getByRole('link', { name: /home/i });
        const hospitalsButton = screen.getByRole('link', { name: /hospitals/i });
        const doctorsButton = screen.getByRole('link', { name: /doctors/i });

        expect(heading).toBeInTheDocument();
        expect(homeButton).toBeInTheDocument();
        expect(hospitalsButton).toBeInTheDocument();
        expect(doctorsButton).toBeInTheDocument();
      });

      it('should allow to visit the doctors page', async () => {
        render(<AdminPage adminUser={adminUser} logout={mockAdminLogout} />, adminUser, jest.fn());
        const doctorsButton = await screen.findByRole('link', { name: /doctors/i });

        await userEvent.click(doctorsButton);

        const doctorsHeading = await screen.findByRole('heading', { name: /doctors/i });

        expect(doctorsHeading).toBeInTheDocument();
      });

      it('should allow to visit the hospitals page', async () => {
        render(<AdminPage adminUser={adminUser} logout={mockAdminLogout} />, adminUser, jest.fn());
        const hospitalsButton = await screen.findByRole('link', { name: /hospitals/i });

        await userEvent.click(hospitalsButton);

        const hospitalsHeading = await screen.findByRole('heading', { name: /hospitals/i });

        expect(hospitalsHeading).toBeInTheDocument();
      });

      it('should allow to log out', async () => {
        const successMessage = 'You have logged out';
        window.confirm = jest.fn().mockReturnValue(true);

        render(<AdminPage adminUser={adminUser} logout={mockAdminLogout} />, adminUser, jest.fn());

        const buttons = screen.getAllByRole('button');
        const logoutButton = buttons.find((button) => button.getAttribute('class') === 'logout-button') as HTMLElement;
        await userEvent.click(logoutButton);

        const toast = await screen.findByText(successMessage);

        expect(toast).toBeInTheDocument();
        expect(mockAdminLogout).toHaveBeenCalledTimes(1);
      });
    });
  });
});
