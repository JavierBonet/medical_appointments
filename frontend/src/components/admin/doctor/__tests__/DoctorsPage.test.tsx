import { type ReactElement } from 'react';
import { render as rtlRender, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { deleteDoctor, getDoctors } from '../../../../api/admin/doctors';
import { ToastContainer } from 'react-toastify';
import { createDoctor } from '../../__tests__/utils/factory';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DoctorsPage from '../DoctorsPage';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

jest.mock('../../../../api/admin/doctors');

const mockedGetDoctors = jest.mocked(getDoctors);
const mockedDeleteDoctor = jest.mocked(deleteDoctor);

const mockLogout = jest.fn();

function render(ui: ReactElement, value = {}, ...options: any[]) {
  function Wrapper() {
    return (
      <>
        <MemoryRouter initialEntries={['/doctors']}>
          <Routes>
            <Route path="doctors" element={ui} />
          </Routes>
        </MemoryRouter>
        <ToastContainer />
      </>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

describe('DoctorsPage', () => {
  describe('when renders', () => {
    const doctor1 = createDoctor();
    const doctor2 = createDoctor();
    const doctor3 = createDoctor();
    beforeEach(() => {
      const doctors = [doctor1, doctor2, doctor3];
      mockedGetDoctors.mockResolvedValue(doctors);
    });

    it('should show the doctors list and the new button', async () => {
      render(<DoctorsPage logout={mockLogout} />);

      const nameHeading = await screen.findByRole('columnheader', { name: 'Name' });
      const surnameHeading = await screen.findByRole('columnheader', { name: 'Surname' });
      const ageHeading = await screen.findByRole('columnheader', { name: 'Age' });
      const specialtyHeading = await screen.findByRole('columnheader', { name: 'Speciality' });

      expect(nameHeading).toBeInTheDocument();
      expect(surnameHeading).toBeInTheDocument();
      expect(ageHeading).toBeInTheDocument();
      expect(specialtyHeading).toBeInTheDocument();

      const firstDoctorName = screen.getByRole('cell', { name: doctor1.name });
      const secondDoctorName = screen.getByRole('cell', { name: doctor2.name });
      const thirdDoctorName = screen.getByRole('cell', { name: doctor3.name });
      const newButton = screen.getByRole('link', { name: /new doctor/i });

      expect(firstDoctorName).toBeInTheDocument();
      expect(secondDoctorName).toBeInTheDocument();
      expect(thirdDoctorName).toBeInTheDocument();
      expect(newButton).toBeInTheDocument();
    });

    it('should allow to delete a doctor', async () => {
      const successMessage = 'Doctor deleted successfully';
      mockedDeleteDoctor.mockResolvedValue(successMessage);
      window.confirm = jest.fn().mockResolvedValue(true);

      render(<DoctorsPage logout={mockLogout} />);

      let firstDoctorName: HTMLElement | null = await screen.findByRole('cell', { name: doctor1.name });

      expect(firstDoctorName).toBeInTheDocument();

      const deleteButtons = screen.getAllByRole('cell', { name: /delete/i });
      const firstDeleteButton = deleteButtons[0];

      await userEvent.click(firstDeleteButton);

      firstDoctorName = screen.queryByRole('cell', { name: doctor1.name });
      const toast = await screen.findByText(successMessage);

      expect(toast).toBeInTheDocument();
      expect(firstDoctorName).not.toBeInTheDocument();
      expect(mockedDeleteDoctor).toHaveBeenCalledTimes(1);
      expect(mockedDeleteDoctor).toHaveBeenCalledWith(doctor1.id);
    });
  });
});
