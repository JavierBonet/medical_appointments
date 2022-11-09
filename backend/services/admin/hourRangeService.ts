import { Attributes, CreationAttributes } from '../../db/models/hourrange';
import { HourRangeRepositoryInterface } from '../../repositories/hourRange';

class HourRangeService {
  private _hourRangesRepository: HourRangeRepositoryInterface;

  constructor(hourRangesRepository: HourRangeRepositoryInterface) {
    this._hourRangesRepository = hourRangesRepository;
  }

  create(hourRange: CreationAttributes) {
    return this._hourRangesRepository.createHourRange(hourRange);
  }

  update(id: number, hourRange: Attributes) {
    return this._hourRangesRepository.updateHourRange(id, hourRange);
  }

  delete(id: number) {
    return this._hourRangesRepository.deleteHourRange(id);
  }
}

export { HourRangeService };
