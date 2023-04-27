import { act, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useParams } from 'react-router-dom';
import {
  dbDaysToDays,
  getDeletedHourRanges,
  getEndHourRangeOptions,
  getHourRangesUpdated,
  getRemainingHourRangesQuantity,
  getStartHourRangeOptions,
} from '../../dayUtils';
import { getDays } from '../../../../../../../api/admin/days';
import { daysMap, dbDays } from './constants';
import useDaysConfiguration from '../useDaysConfiguration';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

const mockUseParams = jest.mocked(useParams);

jest.mock('../../../../../../../api/admin/days');

const mockGetDays = jest.mocked(getDays);

jest.mock('../../dayUtils');

const mockDbDaysToDays = jest.mocked(dbDaysToDays);

const doctorId = '1';
const calendarId = '15';

describe('useDaysConfiguration', () => {
  beforeAll(() => {
    mockUseParams.mockReturnValue({ doctorId, calendarId });
  });

  describe('when hook is rendered', () => {
    beforeAll(() => {
      mockGetDays.mockResolvedValue(dbDays);
      mockDbDaysToDays.mockReturnValue(daysMap);
    });

    describe('and there is a days configuration stored in the database', () => {
      it('should call the corresponding services', async () => {
        // Act
        const { result } = renderHook(() => useDaysConfiguration());

        // Assert
        expect(mockGetDays).toHaveBeenCalledTimes(1);
        expect(mockGetDays).toHaveBeenCalledWith(doctorId, calendarId);
        await waitFor(() => expect(mockDbDaysToDays).toHaveBeenCalledTimes(1));
        expect(mockDbDaysToDays).toHaveBeenCalledWith(dbDays);
      });

      it('should set the days map', async () => {
        // Act
        const { result } = renderHook(() => useDaysConfiguration());

        // Assert
        await waitFor(() => expect(result.current.state.days).toEqual(daysMap));
      });

      it('should set the last selected hour index', () => {
        // <---------------------------- ACA
      });

      describe('daySelectionHandler', () => {
        describe('when called', () => {
          it('should change selected day', async () => {
            // Arrange
            const dayToSelect = 'monday';

            // Act
            const { result } = renderHook(() => useDaysConfiguration());
            await act(async () => result.current.actions.daySelectionHandler(dayToSelect));

            // Assert
            expect(result.current.state.selectedDay).toBe(dayToSelect);
          });
        });
      });

      describe('addHourRangeHandler', () => {
        describe('when called', () => {
          it('should change selected day', async () => {
            // Arrange
            const dayToSelect = 'monday';

            // Act
            const { result } = renderHook(() => useDaysConfiguration());
            await act(async () => result.current.actions.daySelectionHandler(dayToSelect));

            // Assert
            expect(result.current.state.selectedDay).toBe(dayToSelect);
          });
        });
      });

      describe('selectChangeHandler', () => {
        describe('when called', () => {
          it('should change selected day', async () => {
            // Arrange
            const dayToSelect = 'monday';

            // Act
            const { result } = renderHook(() => useDaysConfiguration());
            await act(async () => result.current.actions.daySelectionHandler(dayToSelect));

            // Assert
            expect(result.current.state.selectedDay).toBe(dayToSelect);
          });
        });
      });

      describe('saveHandler', () => {
        describe('when called', () => {
          it('should change selected day', async () => {
            // Arrange
            const dayToSelect = 'monday';

            // Act
            const { result } = renderHook(() => useDaysConfiguration());
            await act(async () => result.current.actions.daySelectionHandler(dayToSelect));

            // Assert
            expect(result.current.state.selectedDay).toBe(dayToSelect);
          });
        });
      });

      describe('deleteHandler', () => {
        describe('when called', () => {
          it('should change selected day', async () => {
            // Arrange
            const dayToSelect = 'monday';

            // Act
            const { result } = renderHook(() => useDaysConfiguration());
            await act(async () => result.current.actions.daySelectionHandler(dayToSelect));

            // Assert
            expect(result.current.state.selectedDay).toBe(dayToSelect);
          });
        });
      });
    });

    describe('and there is not a days configuration stored in the database', () => {
      //asdas
    });
  });
});
