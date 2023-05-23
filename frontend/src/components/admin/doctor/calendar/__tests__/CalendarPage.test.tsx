import { render as rtlRender, type RenderOptions, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getCalendar, saveCalendar, getAvailableHospitals } from '../../../../../api/admin/calendars';
import CalendarPage from '../CalendarPage';
import userEvent from '@testing-library/user-event';

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
const mockSaveCalendar = jest.mocked(saveCalendar);
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

const hospital2: Hospital = {
  id: 2,
  name: 'H2',
  address: 'Riverside 143',
  phone: '85412566',
  zip_code: 2003,
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

function renderWithToastify(ui: JSX.Element, options?: RenderOptions) {
  const newUI = (
    <>
      <ToastContainer />
      {ui}
    </>
  );

  rtlRender(newUI, options);
}

describe('CalendarPage', () => {
  describe('when renders', () => {
    describe('and there is a current calendar', () => {
      const mockNavigate = jest.fn();
      beforeAll(() => {
        mockUseParams.mockReturnValue({ doctorId, calendarId });
        mockUseNavigate.mockReturnValue(mockNavigate);
      });

      beforeEach(() => {
        mockGetCalendar.mockClear();
        mockNavigate.mockClear();
      });

      it('should get the calendar data', async () => {
        // Arrange
        mockGetCalendar.mockResolvedValue({ ...calendar });
        mockGetAvailableHospitals.mockResolvedValue([]);

        // Act
        await act(async () => {
          rtlRender(<CalendarPage />);
        });

        // Assert
        expect(mockGetCalendar).toHaveBeenCalledTimes(1);
        expect(mockGetCalendar).toHaveBeenCalledWith(doctorId, calendarId);
      });

      describe('when get calendar data success', () => {
        beforeAll(() => {
          mockGetCalendar.mockResolvedValue({ ...calendar });
        });

        beforeEach(() => {
          mockGetAvailableHospitals.mockClear();
        });

        it('should obtain the available hospitals', async () => {
          // Arrange
          mockGetAvailableHospitals.mockResolvedValue([hospital2]);

          // Act
          await act(async () => {
            rtlRender(<CalendarPage />);
          });

          // Assert
          expect(mockGetAvailableHospitals).toHaveBeenCalledTimes(1);
          expect(mockGetAvailableHospitals).toHaveBeenCalledWith(doctorId);
        });

        describe('when fails obtaining the available hospitals', () => {
          const errorMessage = 'getAvailableHospitals failed';

          beforeAll(() => {
            mockGetAvailableHospitals.mockRejectedValue(errorMessage);
          });

          it('should show an error message', async () => {
            // Act
            await act(async () => {
              renderWithToastify(<CalendarPage />);
            });

            const toast = await screen.findByText(errorMessage);

            // Assert
            expect(toast).toBeInTheDocument();
          });
        });

        describe('when the user change the form fields', () => {
          const newName = 'New calendar name';

          describe('when the user clicks the update button', () => {
            describe('and there are no errors', () => {
              const successMessage = 'Calendar updated successfully';
              const errorMessage = 'Calendar update failed';

              it('should save the calendar', async () => {
                // Arrange
                mockGetAvailableHospitals.mockResolvedValue([hospital1, hospital2]);
                mockSaveCalendar.mockResolvedValue(successMessage);

                // Act
                await act(async () => {
                  renderWithToastify(<CalendarPage />);
                });

                const nameInput = screen.getByLabelText(/Name/i);
                const hospitalDropdown = screen.getByTestId('hospitalId');

                await act(async () => {
                  await userEvent.clear(nameInput);
                  await userEvent.type(nameInput, newName);

                  await userEvent.click(hospitalDropdown);
                  const dropdownOption = screen.getByRole('option', {
                    name: /H2/i,
                  });
                  await userEvent.click(dropdownOption);
                });

                const updateButton = screen.getByRole('button', {
                  name: /Update/i,
                });

                await userEvent.click(updateButton);

                const expectedCalendar = {
                  ...calendar,
                  name: newName,
                  hospitalId: hospital2.id,
                };

                // Assert
                expect(mockSaveCalendar).toHaveBeenCalledTimes(1);
                expect(mockSaveCalendar).toHaveBeenCalledWith(doctorId, expectedCalendar, expectedCalendar.hospitalId);
              });

              describe('and save succeed', () => {
                it('should navigate back and show success message', async () => {
                  // Arrange
                  mockGetAvailableHospitals.mockResolvedValue([]);
                  mockSaveCalendar.mockResolvedValue(successMessage);

                  // Act
                  await act(async () => {
                    renderWithToastify(<CalendarPage />);
                  });

                  const updateButton = await screen.findByRole('button', {
                    name: /Update/i,
                  });

                  await userEvent.click(updateButton);

                  const toast = await screen.findByText(successMessage);

                  // Assert
                  expect(mockNavigate).toHaveBeenCalledTimes(1);
                  expect(mockNavigate).toHaveBeenCalledWith('..');
                  expect(toast).toBeInTheDocument();
                });
              });

              describe('and save fails', () => {
                it('should show error message', async () => {
                  // Arrange
                  mockGetAvailableHospitals.mockResolvedValue([]);
                  mockSaveCalendar.mockRejectedValue(errorMessage);

                  // Act
                  await act(async () => {
                    renderWithToastify(<CalendarPage />);
                  });

                  const updateButton = await screen.findByRole('button', {
                    name: /Update/i,
                  });

                  await userEvent.click(updateButton);

                  const toast = await screen.findByText(errorMessage);

                  // Assert
                  expect(toast).toBeInTheDocument();
                });
              });
            });
          });
        });
      });

      describe('when get calendar data fails', () => {
        it('should navigate back and show an error message', async () => {
          // Arrange
          const errorMessage = 'Calendar not found';
          mockGetCalendar.mockRejectedValue(errorMessage);
          mockGetAvailableHospitals.mockResolvedValue([]);

          // Act
          await act(async () => {
            renderWithToastify(<CalendarPage />);
          });

          const toast = await screen.findByText(errorMessage);

          // Assert
          expect(mockNavigate).toHaveBeenCalledTimes(1);
          expect(mockNavigate).toHaveBeenCalledWith('..');
          expect(toast).toBeInTheDocument();
        });
      });
    });

    describe('and there is no current calendar', () => {
      const mockNavigate = jest.fn();
      beforeAll(() => {
        mockUseParams.mockReturnValue({ doctorId });
        mockUseNavigate.mockReturnValue(mockNavigate);
      });

      beforeEach(() => {
        mockGetAvailableHospitals.mockReset();
        mockGetAvailableHospitals.mockResolvedValue([]);
        mockNavigate.mockClear();
      });

      it('should get the available hospitals', async () => {
        // Act
        await act(async () => {
          rtlRender(<CalendarPage />);
        });

        // Assert
        expect(mockGetAvailableHospitals).toHaveBeenCalledTimes(1);
        expect(mockGetAvailableHospitals).toHaveBeenCalledWith(doctorId);
      });

      describe('and fails getting the available hospitals', () => {
        it('should show an error message', async () => {
          // Arrange
          const errorMessage = 'getAvailableHospitals failed';
          mockGetAvailableHospitals.mockRejectedValue(errorMessage);

          // Act
          await act(async () => {
            renderWithToastify(<CalendarPage />);
          });

          const toast = await screen.findByText(errorMessage);

          // Assert
          expect(toast).toBeInTheDocument();
        });
      });

      describe('when the user sets all form fields', () => {
        describe('when the user clicks the save button', () => {
          const name = 'Calendar 1';
          const successMessage = 'Calendar created successfully';
          const errorMessage = 'Cannot create calendar';

          beforeEach(() => {
            mockSaveCalendar.mockClear();
          });

          describe('and there are no errors', () => {
            it('should save the calendar', async () => {
              // Arrange
              mockGetAvailableHospitals.mockResolvedValue([hospital1, hospital2]);
              mockSaveCalendar.mockResolvedValue(successMessage);

              // Act
              await act(async () => {
                rtlRender(<CalendarPage />);
              });

              const nameInput = screen.getByLabelText(/Name/i);
              const hospitalDropdown = screen.getByTestId('hospitalId');

              await act(async () => {
                await userEvent.clear(nameInput);
                await userEvent.type(nameInput, name);

                await userEvent.click(hospitalDropdown);
                const dropdownOption = screen.getByRole('option', {
                  name: /H2/i,
                });
                await userEvent.click(dropdownOption);
              });

              const createButton = screen.getByRole('button', {
                name: /Create/i,
              });

              await userEvent.click(createButton);

              const expectedCalendar = {
                name,
                doctorId: parseInt(doctorId),
                hospitalId: hospital2.id,
              };

              // Assert
              expect(mockSaveCalendar).toHaveBeenCalledTimes(1);
              expect(mockSaveCalendar).toHaveBeenCalledWith(doctorId, expectedCalendar, expectedCalendar.hospitalId);
            });

            describe('and save succeed', () => {
              it('should navigate back and show success message', async () => {
                // Arrange
                mockGetAvailableHospitals.mockResolvedValue([hospital1, hospital2]);
                mockSaveCalendar.mockResolvedValue(successMessage);

                // Act
                await act(async () => {
                  renderWithToastify(<CalendarPage />);
                });

                const nameInput = screen.getByLabelText(/Name/i);
                const hospitalDropdown = screen.getByTestId('hospitalId');

                await act(async () => {
                  await userEvent.clear(nameInput);
                  await userEvent.type(nameInput, name);

                  await userEvent.click(hospitalDropdown);
                  const dropdownOption = screen.getByRole('option', {
                    name: /H2/i,
                  });
                  await userEvent.click(dropdownOption);
                });

                const createButton = await screen.findByRole('button', {
                  name: /Create/i,
                });

                await userEvent.click(createButton);

                const toast = await screen.findByText(successMessage);

                // Assert
                expect(mockNavigate).toHaveBeenCalledTimes(1);
                expect(mockNavigate).toHaveBeenCalledWith('..');
                expect(toast).toBeInTheDocument();
              });
            });

            describe('and save fails', () => {
              it('should show error message', async () => {
                // Arrange
                mockGetAvailableHospitals.mockResolvedValue([hospital1, hospital2]);
                mockSaveCalendar.mockRejectedValue(errorMessage);

                // Act
                await act(async () => {
                  renderWithToastify(<CalendarPage />);
                });

                const nameInput = screen.getByLabelText(/Name/i);
                const hospitalDropdown = screen.getByTestId('hospitalId');

                await act(async () => {
                  await userEvent.clear(nameInput);
                  await userEvent.type(nameInput, name);

                  await userEvent.click(hospitalDropdown);
                  const dropdownOption = screen.getByRole('option', {
                    name: /H2/i,
                  });
                  await userEvent.click(dropdownOption);
                });

                const createButton = await screen.findByRole('button', {
                  name: /Create/i,
                });

                await userEvent.click(createButton);

                const toast = await screen.findByText(errorMessage);

                // Assert
                expect(toast).toBeInTheDocument();
              });
            });
          });
        });
      });
    });
  });
});
