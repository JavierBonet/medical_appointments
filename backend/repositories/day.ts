import { FindOptions, InferAttributes, ValidationError } from 'sequelize';
import Day, { Attributes, CreationAttributes } from '../db/models/day';
import { HourRange } from './hourRange';

const DayRepository = {
  getAll: function getAll(
    options?: FindOptions<InferAttributes<Day, { omit: never }>>
  ) {
    return Day.findAll(options);
  },

  getDayById: function getDaylById(
    id: number,
    options?:
      | Omit<
          FindOptions<
            InferAttributes<
              Day,
              {
                omit: never;
              }
            >
          >,
          'where'
        >
      | undefined
  ) {
    return Day.findByPk(id, options);
  },

  createDay: function createDay(day: CreationAttributes) {
    return Day.create(day, { include: [{ model: HourRange }] });
  },

  updateDay: function updateDay(id: number, day: Attributes) {
    return DayRepository.getDayById(id).then((previousDay) => {
      if (previousDay) {
        return previousDay
          .update(day)
          .then((_) => ({ message: `Day ${id} updated successfully` }))
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
        return { message: `Unable to find day ${id}` };
      }
    });
  },

  deleteDay: function deleteDay(id: number) {
    return DayRepository.getDayById(id).then((day) => {
      if (day) {
        day.destroy();
        return { message: `Day ${id} deleted successfully` };
      } else {
        return { message: `Unable to find day ${id}` };
      }
    });
  },
};

export type DayRepositoryInterface = typeof DayRepository;

function createDaysRepository() {
  const repository: DayRepositoryInterface = Object.create(DayRepository);
  return repository;
}

export { createDaysRepository, Day };
