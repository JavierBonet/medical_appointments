import { type ReactElement } from 'react';
import { useParams, Routes, Route, MemoryRouter } from 'react-router-dom';
import { render as rtlRender, screen } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import { getHospital, saveHospital } from '../../../../api/admin/hospitals';
import { createHospital } from '../../__tests__/utils/factory';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import HospitalPage from '../HospitalPage';

function render(ui: ReactElement, hospitalId?: string, ...options: any[]) {
  function Wrapper() {
    return (
      <>
        <MemoryRouter initialEntries={[hospitalId ? `/hospital/${hospitalId}` : '/hospital']}>
          <Routes>
            <Route path="hospital/:hospitalId" element={ui} />
            <Route path="hospital" element={ui} />
          </Routes>
        </MemoryRouter>
        <ToastContainer />
      </>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

jest.mock('../../../../api/admin/hospitals');

const mockedGetHospital = jest.mocked(getHospital);
const mockedSaveHospital = jest.mocked(saveHospital);

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: () => mockedNavigate,
}));

const mockedUseParams = jest.mocked(useParams);

const mockLogout = jest.fn();

describe('HospitalPage', () => {
  describe('when renders', () => {
    beforeEach(() => {
      mockedNavigate.mockClear();
      mockedSaveHospital.mockClear();
    });

    it('should allow to create a hospital', async () => {
      const hospital = createHospital({});
      const successMessage = 'Hospital created successfully';
      mockedSaveHospital.mockResolvedValue(successMessage);
      mockedUseParams.mockReturnValue({});

      render(<HospitalPage logout={mockLogout} />);

      let pageHeader = await screen.findByText('New hospital');
      const nameField = screen.getByLabelText('Name');
      const addressField = screen.getByLabelText('Address');
      const phoneField = screen.getByLabelText('Phone');
      const zipCodeField = screen.getByLabelText('Zip code');

      expect(pageHeader).toBeInTheDocument();
      expect(nameField).toBeInTheDocument();
      expect(addressField).toBeInTheDocument();
      expect(phoneField).toBeInTheDocument();
      expect(zipCodeField).toBeInTheDocument();

      await userEvent.type(nameField, hospital.name);
      await userEvent.type(addressField, hospital.address);
      await userEvent.type(phoneField, hospital.phone);
      await userEvent.type(zipCodeField, hospital.zip_code.toString());

      pageHeader = await screen.findByText(hospital.name);

      expect(pageHeader).toBeInTheDocument();

      const createButton = screen.getByRole('button', { name: /create/i });

      await userEvent.click(createButton);

      const toast = await screen.findByText(successMessage);
      const expectedHospital = {
        name: hospital.name,
        address: hospital.address,
        phone: hospital.phone,
        zip_code: hospital.zip_code.toString(),
      };

      expect(toast).toBeInTheDocument();
      expect(mockedSaveHospital).toHaveBeenCalledTimes(1);
      expect(mockedSaveHospital).toHaveBeenCalledWith(expectedHospital);
    });

    describe('and the hospital exists', () => {
      const hospitalId = '5';
      const hospital = createHospital({ id: parseInt(hospitalId) });
      beforeEach(() => {
        mockedUseParams.mockReturnValue({ hospitalId });
        mockedGetHospital.mockResolvedValue(hospital);
      });

      it('should show hospital data', async () => {
        render(<HospitalPage logout={mockLogout} />, hospitalId);

        const pageHeader = await screen.findByText(hospital.name);
        const nameField = screen.getByLabelText('Name');
        const addressField = screen.getByLabelText('Address');
        const phoneField = screen.getByLabelText('Phone');
        const zipCodeField = screen.getByLabelText('Zip code');

        expect(pageHeader).toBeInTheDocument();
        expect(nameField).toHaveValue(hospital.name);
        expect(addressField).toHaveValue(hospital.address);
        expect(phoneField).toHaveValue(hospital.phone);
        expect(zipCodeField).toHaveValue(hospital.zip_code);
      });

      it('should allow to update the hospital', async () => {
        const otherHospital = createHospital({});
        const successMessage = 'Hospital updated successfully';
        mockedSaveHospital.mockResolvedValue(successMessage);

        render(<HospitalPage logout={mockLogout} />, hospitalId);

        const pageHeader = await screen.findByText(hospital.name);

        expect(pageHeader).toBeInTheDocument();

        const addressField = screen.getByLabelText('Address');
        const phoneField = screen.getByLabelText('Phone');
        const zipCodeField = screen.getByLabelText('Zip code');

        await userEvent.clear(addressField);
        await userEvent.type(addressField, otherHospital.address);

        await userEvent.clear(phoneField);
        await userEvent.type(phoneField, otherHospital.phone);

        await userEvent.clear(zipCodeField);
        await userEvent.type(zipCodeField, otherHospital.zip_code.toString());

        const updateButton = screen.getByRole('button', { name: /update/i });

        await userEvent.click(updateButton);

        const toast = await screen.findByText(successMessage);
        const expectedHospital = {
          ...hospital,
          address: otherHospital.address,
          phone: otherHospital.phone,
          zip_code: otherHospital.zip_code.toString(),
        };

        expect(toast).toBeInTheDocument();
        expect(mockedNavigate).toHaveBeenCalledTimes(1);
        expect(mockedNavigate).toHaveBeenCalledWith('../hospitals');
        expect(mockedSaveHospital).toHaveBeenCalledTimes(1);
        expect(mockedSaveHospital).toHaveBeenCalledWith(expectedHospital);
      });
    });
  });
});
