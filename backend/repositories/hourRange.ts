import { FindOptions, InferAttributes } from 'sequelize';
import HourRange, {
  Attributes,
  CreationAttributes,
} from '../db/models/hourrange';

const HourRangeRepository = {
  getAll: function getAll(
    options?: FindOptions<InferAttributes<HourRange, { omit: never }>>
  ) {
    return HourRange.findAll(options);
  },

  getHourRangeById: function getHourRangelById(
    id: number,
    options?:
      | Omit<
          FindOptions<
            InferAttributes<
              HourRange,
              {
                omit: never;
              }
            >
          >,
          'where'
        >
      | undefined
  ) {
    return HourRange.findByPk(id, options);
  },

  createHourRange: function createHourRange(hourRange: CreationAttributes) {
    return HourRange.create(hourRange);
  },

  updateHourRange: function updateHourRange(id: number, hourRange: Attributes) {
    return HourRangeRepository.getHourRangeById(id).then(
      (previousHourRange) => {
        if (previousHourRange) {
          previousHourRange.update(hourRange);
          return { message: `Hour range ${id} updated successfully` };
        } else {
          return { message: `Unable to find hour range ${id}` };
        }
      }
    );
  },

  deleteHourRange: function deleteHourRange(id: number) {
    return HourRangeRepository.getHourRangeById(id).then((hourRange) => {
      if (hourRange) {
        hourRange.destroy();
        return { message: `Hour range ${id} deleted successfully` };
      } else {
        return { message: `Unable to find hour range ${id}` };
      }
    });
  },
};

export type HourRangeRepositoryInterface = typeof HourRangeRepository;

function createHourRangesRepository() {
  const repository: HourRangeRepositoryInterface =
    Object.create(HourRangeRepository);
  return repository;
}

export { createHourRangesRepository, HourRange };
