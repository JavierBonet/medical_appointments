import ConfigureDays from '../ConfigureDays';
import userEvent from '@testing-library/user-event';
import { useParams } from 'react-router-dom';
import { act, render as rtlRender, screen, within, ByRoleMatcher, RenderOptions } from '@testing-library/react';
import { getDays, saveDays } from '../../../../../../api/admin/days';
import { ToastContainer } from 'react-toastify';
import '@testing-library/jest-dom';

jest.mock('../../../../../../api/admin/days');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

const mockGetDays = jest.mocked(getDays);
const mockSaveDays = jest.mocked(saveDays);
const mockUseParams = jest.mocked(useParams);

const dbDays = [
  {
    id: 209,
    name: 'friday',
    number: 4,
    calendarId: 76,
    createdAt: '2022-12-03T18:07:06.000Z',
    updatedAt: '2022-12-03T18:07:06.000Z',
    HourRanges: [],
  },
  {
    id: 210,
    name: 'thursday',
    number: 3,
    calendarId: 76,
    createdAt: '2022-12-03T18:07:06.000Z',
    updatedAt: '2022-12-03T18:07:06.000Z',
    HourRanges: [],
  },
  {
    id: 207,
    name: 'wednesday',
    number: 2,
    calendarId: 76,
    createdAt: '2022-12-03T18:07:06.000Z',
    updatedAt: '2022-12-03T18:07:06.000Z',
    HourRanges: [],
  },
  {
    id: 208,
    name: 'monday',
    number: 0,
    calendarId: 76,
    createdAt: '2022-12-03T18:07:06.000Z',
    updatedAt: '2022-12-03T18:07:06.000Z',
    HourRanges: [
      {
        id: 196,
        start: '7:00',
        end: '7:45',
        dayId: 208,
        createdAt: '2022-12-03T18:07:06.000Z',
        updatedAt: '2022-12-03T18:07:06.000Z',
      },
      {
        id: 198,
        start: '8:00',
        end: '8:30',
        dayId: 208,
        createdAt: '2022-12-03T18:07:06.000Z',
        updatedAt: '2022-12-03T18:07:06.000Z',
      },
    ],
  },
  {
    id: 206,
    name: 'tuesday',
    number: 1,
    calendarId: 76,
    createdAt: '2022-12-03T18:07:06.000Z',
    updatedAt: '2022-12-03T18:07:06.000Z',
    HourRanges: [
      {
        id: 200,
        start: '7:15',
        end: '8:00',
        dayId: 206,
        createdAt: '2022-12-03T18:07:38.000Z',
        updatedAt: '2022-12-03T18:07:38.000Z',
      },
    ],
  },
];

const days = {
  monday: [
    {
      id: 196,
      start: {
        options: [
          {
            key: 0,
            value: 0,
            text: '7:00',
          },
          {
            key: 1,
            value: 1,
            text: '7:15',
          },
          {
            key: 2,
            value: 2,
            text: '7:30',
          },
          {
            key: 3,
            value: 3,
            text: '7:45',
          },
          {
            key: 4,
            value: 4,
            text: '8:00',
          },
          {
            key: 5,
            value: 5,
            text: '8:15',
          },
          {
            key: 6,
            value: 6,
            text: '8:30',
          },
          {
            key: 7,
            value: 7,
            text: '8:45',
          },
          {
            key: 8,
            value: 8,
            text: '9:00',
          },
        ],
        selected: 0,
      },
      end: {
        options: [
          {
            key: 1,
            value: 1,
            text: '7:15',
          },
          {
            key: 2,
            value: 2,
            text: '7:30',
          },
          {
            key: 3,
            value: 3,
            text: '7:45',
          },
          {
            key: 4,
            value: 4,
            text: '8:00',
          },
          {
            key: 5,
            value: 5,
            text: '8:15',
          },
          {
            key: 6,
            value: 6,
            text: '8:30',
          },
          {
            key: 7,
            value: 7,
            text: '8:45',
          },
          {
            key: 8,
            value: 8,
            text: '9:00',
          },
        ],
        selected: 3,
      },
    },
    {
      id: 198,
      start: {
        options: [
          {
            key: 4,
            value: 4,
            text: '8:00',
          },
          {
            key: 5,
            value: 5,
            text: '8:15',
          },
          {
            key: 6,
            value: 6,
            text: '8:30',
          },
          {
            key: 7,
            value: 7,
            text: '8:45',
          },
          {
            key: 8,
            value: 8,
            text: '9:00',
          },
        ],
        selected: 4,
      },
      end: {
        options: [
          {
            key: 5,
            value: 5,
            text: '8:15',
          },
          {
            key: 6,
            value: 6,
            text: '8:30',
          },
          {
            key: 7,
            value: 7,
            text: '8:45',
          },
          {
            key: 8,
            value: 8,
            text: '9:00',
          },
        ],
        selected: 6,
      },
    },
  ],
  tuesday: [],
  // tuesday: [
  //   {
  //     id: 200,
  //     start: {
  //       options: [
  //         {
  //           key: 0,
  //           value: 0,
  //           text: '7:00',
  //         },
  //         {
  //           key: 1,
  //           value: 1,
  //           text: '7:15',
  //         },
  //         {
  //           key: 2,
  //           value: 2,
  //           text: '7:30',
  //         },
  //         {
  //           key: 3,
  //           value: 3,
  //           text: '7:45',
  //         },
  //         {
  //           key: 4,
  //           value: 4,
  //           text: '8:00',
  //         },
  //         {
  //           key: 5,
  //           value: 5,
  //           text: '8:15',
  //         },
  //         {
  //           key: 6,
  //           value: 6,
  //           text: '8:30',
  //         },
  //         {
  //           key: 7,
  //           value: 7,
  //           text: '8:45',
  //         },
  //         {
  //           key: 8,
  //           value: 8,
  //           text: '9:00',
  //         },
  //       ],
  //       selected: 1,
  //     },
  //     end: {
  //       options: [
  //         {
  //           key: 2,
  //           value: 2,
  //           text: '7:30',
  //         },
  //         {
  //           key: 3,
  //           value: 3,
  //           text: '7:45',
  //         },
  //         {
  //           key: 4,
  //           value: 4,
  //           text: '8:00',
  //         },
  //         {
  //           key: 5,
  //           value: 5,
  //           text: '8:15',
  //         },
  //         {
  //           key: 6,
  //           value: 6,
  //           text: '8:30',
  //         },
  //         {
  //           key: 7,
  //           value: 7,
  //           text: '8:45',
  //         },
  //         {
  //           key: 8,
  //           value: 8,
  //           text: '9:00',
  //         },
  //       ],
  //       selected: 4,
  //     },
  //   },
  // ],
  wednesday: [],
  thursday: [],
  friday: [],
};

const doctorId = '1';
const calendarId = '20';

async function findDropdownOption(index: number, type: 'start' | 'end', option: string) {
  const hourRanges = await screen.findAllByTestId(/day-hour-range/i);

  const dropdown = await within(hourRanges[index]).findByTestId(type);

  return await within(dropdown).findByText(option);
}

async function findDropdownOptionByRole(index: number, type: 'start' | 'end', role: ByRoleMatcher) {
  const hourRanges = await screen.findAllByTestId(/day-hour-range/i);

  const dropdown = await within(hourRanges[index]).findByTestId(type);

  return await within(dropdown).findByRole(role);
}

function renderWithToastify(ui: JSX.Element, options?: RenderOptions) {
  const newUI = (
    <>
      <ToastContainer />
      {ui}
    </>
  );

  rtlRender(newUI, options);
}

describe('ConfigureDays', () => {
  describe('when renders', () => {
    beforeAll(() => {
      mockUseParams.mockReturnValue({ doctorId, calendarId });
    });

    it('should allow the user to add hour ranges', async () => {
      // Arrange
      mockGetDays.mockResolvedValue([]);

      // Act
      await act(async () => {
        rtlRender(<ConfigureDays />);
      });

      const addButton = screen.getByRole('button', { name: /add/i });

      await act(async () => userEvent.click(addButton));

      const newFirstEndDropdownOption = await findDropdownOption(0, 'end', '10:30');

      await act(async () => userEvent.click(newFirstEndDropdownOption));

      await act(async () => userEvent.click(addButton));

      const secondStartDropdownOption = await findDropdownOptionByRole(1, 'start', 'alert');

      expect(secondStartDropdownOption.textContent).toBe('10:45');

      let secondEndDropdownOption = await findDropdownOptionByRole(1, 'end', 'alert');

      expect(secondEndDropdownOption.textContent).toBe('11:00');
    });

    it('should allow the user to modify hour ranges', async () => {
      // Arrange
      mockGetDays.mockResolvedValue(dbDays);

      // Act
      await act(async () => {
        rtlRender(<ConfigureDays />);
      });

      const newFirstEndDropdownOption = await findDropdownOption(0, 'end', '8:30');

      await act(async () => userEvent.click(newFirstEndDropdownOption));

      const secondStartDropdownOption = await findDropdownOptionByRole(1, 'start', 'alert');

      expect(secondStartDropdownOption.textContent).toBe('8:45');

      let secondEndDropdownOption = await findDropdownOptionByRole(1, 'end', 'alert');

      expect(secondEndDropdownOption.textContent).toBe('9:00');

      // Should change second hour range dropdown values
      // when modifying second start dropdown
      const newSecondStartDropdownOption = await findDropdownOption(1, 'start', '12:30');

      await act(async () => userEvent.click(newSecondStartDropdownOption));

      secondEndDropdownOption = await findDropdownOptionByRole(1, 'end', 'alert');

      expect(secondEndDropdownOption.textContent).toBe('12:45');

      // DID IT. I CAN START VERIFYING THAT THE NEXT HOUR RANGE HAS THE CORRESPONDING
      // START AND END SET
    });

    it('should allow the user to delete hour ranges', async () => {
      // Arrange
      mockGetDays.mockResolvedValue(dbDays);
      mockSaveDays.mockResolvedValue('Calendar successfully saved');

      // Act
      await act(async () => {
        rtlRender(<ConfigureDays />);
      });

      let hourRanges = await screen.findAllByTestId(/day-hour-range/i);

      expect(hourRanges.length).toBe(2);

      const deleteButton = screen.getByRole('button', { name: /delete/i });

      await act(async () => userEvent.click(deleteButton));

      hourRanges = await screen.findAllByTestId(/day-hour-range/i);

      expect(hourRanges.length).toBe(1);
    });

    it('should allow the user to save current hour ranges', async () => {
      // Arrange
      const successMessage = 'Calendar successfully saved';
      mockGetDays.mockResolvedValue(dbDays);
      mockSaveDays.mockResolvedValue(successMessage);

      // Act
      await act(async () => {
        renderWithToastify(<ConfigureDays />);
      });

      const addButton = screen.getByRole('button', { name: /add/i });

      await act(async () => userEvent.click(addButton));

      const saveButton = screen.getByRole('button', { name: /save/i });

      await act(async () => userEvent.click(saveButton));

      const toast = await screen.findByText(successMessage);

      expect(toast).toBeInTheDocument();
    });

    it('should disable add button when user selects one of the last 2 options', async () => {
      // Arrange
      mockGetDays.mockResolvedValue(dbDays);

      // Act
      await act(async () => {
        rtlRender(<ConfigureDays />);
      });

      const addButton = screen.getByRole('button', { name: /add/i });

      expect(addButton).toBeEnabled();

      const secondEndDropdownOption = await findDropdownOption(0, 'end', '21:45');

      await act(async () => userEvent.click(secondEndDropdownOption));

      expect(addButton).toBeDisabled();

      const otherSecondEndDropdownOption = await findDropdownOption(0, 'end', '21:00');

      await act(async () => userEvent.click(otherSecondEndDropdownOption));

      expect(addButton).toBeEnabled();

      const lastSecondEndDropdownOption = await findDropdownOption(0, 'end', '21:30');

      await act(async () => userEvent.click(lastSecondEndDropdownOption));

      expect(addButton).toBeDisabled();
    });

    it('should update hour range start options when modifying previous end option', async () => {
      // Arrange
      mockGetDays.mockResolvedValue(dbDays);

      // Act
      await act(async () => {
        rtlRender(<ConfigureDays />);
      });

      const firstEndDropdownOption = await findDropdownOption(0, 'end', '7:15');

      await act(() => userEvent.click(firstEndDropdownOption));

      const secondStartDropdownOption = await findDropdownOption(1, 'start', '7:30');

      expect(secondStartDropdownOption).toBeInTheDocument();
    });

    it('should allow the user to select a day', async () => {
      // Arrange
      mockGetDays.mockResolvedValue(dbDays);

      // Act
      await act(async () => {
        rtlRender(<ConfigureDays />);
      });

      const thursday = screen.getByText(/thursday/i);

      await act(() => userEvent.click(thursday));

      let hourRanges = screen.queryAllByTestId('day-hour-range');

      expect(hourRanges.length).toBe(0);

      const tuesday = screen.getByText(/tuesday/i);

      await act(() => userEvent.click(tuesday));

      hourRanges = screen.queryAllByTestId('day-hour-range');

      expect(hourRanges.length).toBe(1);
    });
  });
});
