import { FindOptions, InferAttributes } from 'sequelize/types';
import Day, { Attributes, CreationAttributes } from '../../db/models/day';
import { DayRepositoryInterface } from '../../repositories/day';

class DayService {
  private _daysRepository: DayRepositoryInterface;

  constructor(daysRepository: DayRepositoryInterface) {
    this._daysRepository = daysRepository;
  }

  getAll(
    options?:
      | FindOptions<
          InferAttributes<
            Day,
            {
              omit: never;
            }
          >
        >
      | undefined
  ) {
    return this._daysRepository.getAll(options);
  }

  getById(
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
    return this._daysRepository.getDayById(id, options);
  }

  create(day: CreationAttributes) {
    return this._daysRepository.createDay(day);
  }

  update(id: number, day: Attributes) {
    return this._daysRepository.updateDay(id, day);
  }

  delete(id: number) {
    return this._daysRepository.deleteDay(id);
  }
}

export { DayService };
