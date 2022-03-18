import { FindOptions, InferAttributes } from 'sequelize';
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
        previousDay.update(day);
        return { message: `Day ${id} updated successfully` };
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
