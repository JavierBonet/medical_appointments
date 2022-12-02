import {
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
import userEvent from '@testing-library/user-event';
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

/**
 * The tests included in this file are the ones that verifies
 * the behavior between CalendarsPage and its child components
 */

describe('CalendarsPage', () => {
  beforeAll(() => {
    mockUseParams.mockReturnValue({ doctorId } as any);
  });

  describe('when renders', () => {
    describe('and are calendars available', () => {
      // Arrange
      const doctor1: Doctor = {
        id: 1,
        name: 'Pablo',
        surname: 'Rodriguez',
        speciality: 'Dermatologist',
        Calendars: [],
      };
      const doctor2: Doctor = {
        id: 2,
        name: 'Richard',
        surname: 'Enstril',
        speciality: 'Surgeon',
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

      const calendarId1 = 1;
      const calendarName1 = 'C1';
      const calendarId2 = 2;
      const calendarName2 = 'C2';
      const calendars: Calendar[] = [
        {
          id: calendarId1,
          name: calendarName1,
          doctorId: doctor1.id,
          hospitalId: hospital1.id,
          Days: [],
          Doctor: doctor1,
          Hospital: hospital1,
        },
        {
          id: calendarId2,
          name: calendarName2,
          doctorId: doctor2.id,
          hospitalId: hospital2.id,
          Days: [],
          Doctor: doctor2,
          Hospital: hospital2,
        },
      ];

      beforeAll(() => {
        mockGetCalendars.mockResolvedValue(calendars);
      });

      it('should show a heading and the calendars list', async () => {
        mockAreAvailableHospitals.mockResolvedValue(true);

        // Act
        await act(async () => {
          rtlRender(<CalendarsPage />);
        });

        const calendarsHeading = screen.getByRole('heading', {
          name: /Calendars/i,
        });
        const nameListHeader = screen.getByRole('columnheader', {
          name: /Name/i,
        });
        const doctorListHeader = screen.getByRole('columnheader', {
          name: /Doctor/i,
        });
        const hospitalListHeader = screen.getByRole('columnheader', {
          name: /Hospital/i,
        });
        const actionsListHeader = screen.getByRole('columnheader', {
          name: /Actions/i,
        });

        // Assert
        expect(calendarsHeading).toBeInTheDocument();
        expect(nameListHeader).toBeInTheDocument();
        expect(doctorListHeader).toBeInTheDocument();
        expect(hospitalListHeader).toBeInTheDocument();
        expect(actionsListHeader).toBeInTheDocument();
      });

      describe('when user clicks on the delete button', () => {
        beforeAll(() => {
          mockAreAvailableHospitals.mockResolvedValue(false);
        });

        it('should show the confirmation window', async () => {
          // Arrange
          const spiedConfirm = jest.spyOn(window, 'confirm');
          spiedConfirm.mockReturnValue(false);

          // Act
          await act(async () => {
            rtlRender(<CalendarsPage />);
            const deleteButton = (
              await screen.findAllByRole('cell', {
                name: 'Delete',
              })
            )[1];

            await userEvent.click(deleteButton);
          });

          // Assert
          expect(spiedConfirm).toHaveBeenCalledTimes(1);
        });

        describe('and confirms', () => {
          beforeAll(() => {
            const spiedConfirm = jest.spyOn(window, 'confirm');
            spiedConfirm.mockReturnValue(true);
            mockGetCalendars.mockResolvedValue(calendars);
          });

          beforeEach(() => {
            mockDeleteCalendar.mockReset();
          });

          it('should call the delete service', async () => {
            // Arrange
            const deleteMessage = 'Calendar deleted successfully';
            mockDeleteCalendar.mockResolvedValue(deleteMessage);

            // Act
            await act(async () => {
              renderWithToastify(<CalendarsPage />);
            });

            const deleteButton = (
              await screen.findAllByRole('cell', {
                name: 'Delete',
              })
            )[1];

            await userEvent.click(deleteButton);

            const toast = await screen.findByText(deleteMessage);

            // Assert
            expect(toast).toBeInTheDocument();

            // Assert
            expect(mockDeleteCalendar).toHaveBeenCalledTimes(1);
            expect(mockDeleteCalendar).toHaveBeenCalledWith(
              doctorId,
              calendarId2
            );
          });

          describe('and delete service succeed', () => {
            it('should remove the calendar from the list and show a success message', async () => {
              // Arrange
              const deleteMessage = 'Calendar deleted successfully';
              mockDeleteCalendar.mockResolvedValue(deleteMessage);

              // Act
              await act(async () => {
                renderWithToastify(<CalendarsPage />);
              });

              const deleteButton = (
                await screen.findAllByRole('cell', {
                  name: 'Delete',
                })
              )[1];

              await userEvent.click(deleteButton);

              const toast = await screen.findByText(deleteMessage);

              // Assert
              expect(toast).toBeInTheDocument();

              const calendarNameElement = screen.queryByText(calendarName2);

              // Assert
              expect(mockDeleteCalendar).toHaveBeenCalledTimes(1);
              expect(mockDeleteCalendar).toHaveBeenCalledWith(
                doctorId,
                calendarId2
              );
              expect(calendarNameElement).not.toBeInTheDocument();
            });
          });

          describe('and delete service fails', () => {
            it('should not remove any calendar from the list and show an error message', async () => {
              // Arrange
              const deleteMessage = 'Calendar could not be deleted';
              mockDeleteCalendar.mockRejectedValue(deleteMessage);

              // Act
              await act(async () => {
                renderWithToastify(<CalendarsPage />);
              });

              const deleteButton = (
                await screen.findAllByRole('cell', {
                  name: 'Delete',
                })
              )[1];

              await userEvent.click(deleteButton);

              const toast = await screen.findByText(deleteMessage);

              // Assert
              expect(toast).toBeInTheDocument();

              const calendarNameElement = screen.queryByText(calendarName2);

              // Assert
              expect(mockDeleteCalendar).toHaveBeenCalledTimes(1);
              expect(mockDeleteCalendar).toHaveBeenCalledWith(
                doctorId,
                calendarId2
              );
              expect(calendarNameElement).toBeInTheDocument();
            });
          });
        });

        describe('and cancels', () => {
          beforeAll(() => {
            mockDeleteCalendar.mockReset();
            const spiedConfirm = jest.spyOn(window, 'confirm');
            spiedConfirm.mockReturnValue(false);
            mockGetCalendars.mockResolvedValue(calendars);
          });

          it('should not remove any calendar from the list and should not call the delete service', async () => {
            // Act
            await act(async () => {
              rtlRender(<CalendarsPage />);
            });

            const deleteButton = (
              await screen.findAllByRole('cell', {
                name: 'Delete',
              })
            )[1];

            await userEvent.click(deleteButton);

            const calendarNameElement = screen.queryByText(calendarName2);

            // Assert
            expect(calendarNameElement).toBeInTheDocument();
            expect(mockDeleteCalendar).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
});
