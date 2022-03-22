import { FindOptions, InferAttributes, ValidationError } from 'sequelize';
import Calendar, {
  Attributes,
  CreationAttributes,
} from '../db/models/calendar';
import Day from '../db/models/day';
import HourRange from '../db/models/hourrange';

const CalendarRepository = {
  getAll: function getAll(
    options?: FindOptions<InferAttributes<Calendar, { omit: never }>>
  ) {
    return Calendar.findAll(options);
  },

  getCalendarById: function getCalendarlById(
    id: number,
    options?:
      | Omit<
          FindOptions<
            InferAttributes<
              Calendar,
              {
                omit: never;
              }
            >
          >,
          'where'
        >
      | undefined
  ) {
    return Calendar.findByPk(id, options);
  },

  createCalendar: function createCalendar(calendar: CreationAttributes) {
    return Calendar.create(calendar);
  },

  updateCalendar: function updateCalendar(id: number, calendar: Attributes) {
    return CalendarRepository.getCalendarById(id).then((previousCalendar) => {
      if (previousCalendar) {
        return previousCalendar
          .update(calendar)
          .then((_) => ({ message: `Calendar ${id} updated successfully` }))
          .catch((err: Error) => {
            let message;
            if (err instanceof ValidationError && err.errors) {
              message = err.errors.map((error) => error.message).join('\n');
            } else {
              message = err.message;
            }
            throw { message };
          });
      } else {
        return { message: `Unable to find calendar ${id}` };
      }
    });
  },

  deleteCalendar: function deleteCalendar(id: number) {
    return CalendarRepository.getCalendarById(id).then((calendar) => {
      if (calendar) {
        calendar.destroy();
        return { message: `Calendar ${id} deleted successfully` };
      } else {
        return { message: `Unable to find calendar ${id}` };
      }
    });
  },
};

export type CalendarRepositoryInterface = typeof CalendarRepository;

function createCalendarsRepository() {
  const repository: CalendarRepositoryInterface =
    Object.create(CalendarRepository);
  return repository;
}

export { createCalendarsRepository, Calendar };
