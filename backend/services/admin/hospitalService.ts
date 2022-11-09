import { FindOptions, InferAttributes } from 'sequelize/types';
import { Attributes, CreationAttributes } from '../../db/models/hospital';
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
    options?:
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

  getById(id: number) {
    return this._hospitalsRepository.getHospitalById(id);
  }

  create(hospital: CreationAttributes) {
    return this._hospitalsRepository.createHospital(hospital);
  }

  update(id: number, hospital: Attributes) {
    return this._hospitalsRepository.updateHospital(id, hospital);
  }

  delete(id: number) {
    return this._hospitalsRepository.deleteHospital(id);
  }
}

export { HospitalService };
