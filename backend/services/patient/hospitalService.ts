import { FindOptions, InferAttributes } from 'sequelize/types';
import {
  Hospital,
  HospitalRepositoryInterface,
} from '../../repositories/hospital';

class HospitalService {
  private _hospitalsRepository: HospitalRepositoryInterface;

  constructor(hospitalsRepository: HospitalRepositoryInterface) {
    this._hospitalsRepository = hospitalsRepository;
  }

  getAll(
    options:
      | FindOptions<
          InferAttributes<
            Hospital,
            {
              omit: never;
            }
          >
        >
      | undefined
  ) {
    return this._hospitalsRepository.getAll(options);
  }
}

export { HospitalService };
