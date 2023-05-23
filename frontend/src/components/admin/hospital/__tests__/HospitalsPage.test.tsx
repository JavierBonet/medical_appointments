import { type ReactElement } from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { render as rtlRender, screen } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import { getHospitals, deleteHospital } from '../../../../api/admin/hospitals';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import HospitalsPage from '../HospitalsPage';
import { createHospital } from '../../__tests__/utils/factory';

jest.mock('../../../../api/admin/hospitals');

const mockedGetHospitals = jest.mocked(getHospitals);
const mockedDeleteHospital = jest.mocked(deleteHospital);

function render(ui: ReactElement, ...options: any[]) {
  function Wrapper() {
    return (
      <>
        <MemoryRouter initialEntries={['/hospitals']}>
          <Routes>
            <Route path="hospitals" element={ui} />
          </Routes>
        </MemoryRouter>
        <ToastContainer />
      </>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

const mockLogout = jest.fn();

describe('HospitalsPage', () => {
  describe('when renders', () => {
    const hospital1 = createHospital({});
    const hospital2 = createHospital({});
    beforeEach(() => {
      mockedGetHospitals.mockResolvedValue([hospital1, hospital2]);
    });

    it('should show the hospitals list and the new button', async () => {
      render(<HospitalsPage logout={mockLogout} />);

      const pageHeader = await screen.findByRole('heading', { name: 'Hospitals' });
      const nameTableHeader = screen.getByRole('columnheader', { name: 'Name' });
      const addressTableHeader = screen.getByRole('columnheader', { name: 'Address' });
      const phoneTableHeader = screen.getByRole('columnheader', { name: 'Phone' });
      const zipCodeTableHeader = screen.getByRole('columnheader', { name: 'Zip code' });
      const firstHospitalName = screen.getByText(hospital1.name);
      const secondHospitalName = screen.getByText(hospital2.name);
      const newButton = screen.getByRole('link', { name: 'New hospital' });

      expect(pageHeader).toBeInTheDocument();
      expect(nameTableHeader).toBeInTheDocument();
      expect(addressTableHeader).toBeInTheDocument();
      expect(phoneTableHeader).toBeInTheDocument();
      expect(zipCodeTableHeader).toBeInTheDocument();
      expect(firstHospitalName).toBeInTheDocument();
      expect(secondHospitalName).toBeInTheDocument();
      expect(newButton).toBeInTheDocument();
    });

    it('should allow to delete a hospital', async () => {
      const successMessage = 'Hospital deleted successfully';
      mockedDeleteHospital.mockResolvedValue(successMessage);
      window.confirm = jest.fn().mockReturnValue(true);

      render(<HospitalsPage logout={mockLogout} />);

      const pageHeader = await screen.findByRole('heading', { name: 'Hospitals' });
      let firstHospitalName: HTMLElement | null = screen.getByRole('cell', { name: hospital1.name });

      expect(pageHeader).toBeInTheDocument();
      expect(firstHospitalName).toBeInTheDocument();

      const deleteButtons = screen.getAllByRole('cell', { name: /delete/i });
      const firstDeleteButton = deleteButtons[0];

      await userEvent.click(firstDeleteButton);

      const toast = await screen.findByText(successMessage);
      firstHospitalName = screen.queryByRole('cell', { name: hospital1.name });

      expect(toast).toBeInTheDocument();
      expect(firstHospitalName).not.toBeInTheDocument();
      expect(mockedDeleteHospital).toHaveBeenCalledTimes(1);
      expect(mockedDeleteHospital).toHaveBeenCalledWith(hospital1.id);
    });
  });
});
