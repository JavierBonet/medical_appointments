import { FindOptions, InferAttributes } from 'sequelize/types';
import { Doctor, DoctorRepositoryInterface } from '../../repositories/doctor';

class DoctorService {
  private _doctorsRepository: DoctorRepositoryInterface;

  constructor(doctorsRepository: DoctorRepositoryInterface) {
    this._doctorsRepository = doctorsRepository;
  }

  getAll(
    options:
      | FindOptions<
          InferAttributes<
            Doctor,
            {
              omit: never;
            }
          >
        >
      | undefined
  ) {
    return this._doctorsRepository.getAll(options);
  }
}

export { DoctorService };
