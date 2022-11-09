import { FindOptions, InferAttributes } from 'sequelize/types';
import Calendar, {
  Attributes,
  CreationAttributes,
} from '../../db/models/calendar';
import { CalendarRepositoryInterface } from '../../repositories/calendar';

class CalendarService {
  private _calendarsRepository: CalendarRepositoryInterface;

  constructor(calendarsRepository: CalendarRepositoryInterface) {
    this._calendarsRepository = calendarsRepository;
  }

  getAll(
    options?:
      | FindOptions<
          InferAttributes<
            Calendar,
            {
              omit: never;
            }
          >
        >
      | undefined
  ) {
    return this._calendarsRepository.getAll(options);
  }

  getById(
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
    return this._calendarsRepository.getCalendarById(id, options);
  }

  create(calendar: CreationAttributes) {
    return this._calendarsRepository.createCalendar(calendar);
  }

  update(id: number, calendar: Attributes) {
    return this._calendarsRepository.updateCalendar(id, calendar);
  }

  delete(id: number) {
    return this._calendarsRepository.deleteCalendar(id);
  }
}

export { CalendarService };
