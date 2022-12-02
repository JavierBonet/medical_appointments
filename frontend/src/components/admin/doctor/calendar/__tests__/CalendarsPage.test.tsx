import {
  render,
  render as rtlRender,
  RenderOptions,
  screen,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  areAvailableHospitals,
  deleteCalendar,
  getCalendars,
} from '../../../../../api/admin/calendars';
import '@testing-library/jest-dom';
import CalendarsPage from '../CalendarsPage';

function renderWithToastify(ui: JSX.Element, options?: RenderOptions) {
  return rtlRender(
    <>
      <ToastContainer autoClose={500} position="top-center" closeOnClick />
      {ui}
    </>,
    options
  );
}

const doctorId = 4;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  Link: (props: { to: string }) => <a href={props.to}>New calendar</a>,
}));

const mockUseParams = jest.mocked(useParams);

jest.mock('../../../../../api/admin/calendars', () => ({
  areAvailableHospitals: jest.fn(),
  deleteCalendar: jest.fn(),
  getCalendars: jest.fn(),
}));

const mockAreAvailableHospitals = jest.mocked(areAvailableHospitals);
const mockDeleteCalendar = jest.mocked(deleteCalendar);
const mockGetCalendars = jest.mocked(getCalendars);

describe('CalendarsPage', () => {
  beforeAll(() => {
    mockUseParams.mockReturnValue({ doctorId } as any);
  });

  describe('when renders', () => {
    it('should call corresnponding services', async () => {
      // Arrange
      mockGetCalendars.mockResolvedValue([]);
      mockAreAvailableHospitals.mockResolvedValue(true);

      // Act
      await act(async () => {
        rtlRender(<CalendarsPage />);
      });

      // Assert
      expect(mockGetCalendars).toHaveBeenCalledTimes(1);
      expect(mockGetCalendars).toHaveBeenCalledWith(doctorId);
      expect(mockAreAvailableHospitals).toHaveBeenCalledTimes(2);
      expect(mockAreAvailableHospitals).toHaveBeenNthCalledWith(1, doctorId);
      expect(mockAreAvailableHospitals).toHaveBeenNthCalledWith(2, doctorId);
    });

    describe('and areAvailableHospitals succeed', () => {
      beforeAll(() => {
        mockGetCalendars.mockResolvedValue([]);
      });

      describe('and returns true', () => {
        it('should show the new calendar link', async () => {
          // Arrange
          mockAreAvailableHospitals.mockResolvedValue(true);

          // Act
          await act(async () => {
            rtlRender(<CalendarsPage />);
          });

          const newCalendarLink = screen.getByRole('link', {
            name: /New calendar/i,
          });

          // Assert
          expect(newCalendarLink).toBeInTheDocument();
        });
      });

      describe('and returns false', () => {
        it('should show the explanation message', async () => {
          // Arrange
          mockAreAvailableHospitals.mockResolvedValue(false);

          // Act
          await act(async () => {
            rtlRender(<CalendarsPage />);
          });

          const explanationMessage = screen.getByText(
            /This doctor already has a calendar for each hospital/i
          );

          // Assert
          expect(explanationMessage).toBeInTheDocument();
        });
      });
    });

    describe('and areAvailableHospitals fails', () => {
      it('should show error message', async () => {
        // Arrange
        const errorMessage = 'areAvailableHospitals failed';
        mockAreAvailableHospitals.mockRejectedValue(errorMessage);
        mockGetCalendars.mockResolvedValue([]);

        screen.debug();
        // Act
        await act(async () => {
          renderWithToastify(<CalendarsPage />);
        });

        const errorMessageElement = (
          await screen.findAllByText(errorMessage)
        )[0];

        // Assert
        expect(errorMessageElement).toBeInTheDocument();
      });
    });

    describe('and getCalendars succeed', () => {
      describe('and retrieves an empty array', () => {
        it('should show no calendars available message', async () => {
          // Arrange
          mockGetCalendars.mockResolvedValue([]);
          mockAreAvailableHospitals.mockResolvedValue(true);

          // Act
          await act(async () => {
            rtlRender(<CalendarsPage />);
          });

          const noCalendarsMessage = screen.getByRole('heading', {
            name: /No Calendars available/i,
          });

          // Assert
          expect(noCalendarsMessage).toBeInTheDocument();
        });
      });
    });

    describe('when getCalendars fails', () => {
      it('should show error message', async () => {
        // Arrange
        const errorMessage = 'getCalendars failed';
        mockAreAvailableHospitals.mockResolvedValue(true);
        mockGetCalendars.mockRejectedValue(errorMessage);

        // Act
        await act(async () => {
          renderWithToastify(<CalendarsPage />);
        });

        const errorMessageElement = await screen.findByText(errorMessage);

        // Assert
        expect(errorMessageElement).toBeInTheDocument();
      });
    });
  });
});
