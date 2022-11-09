import { FindOptions, InferAttributes } from 'sequelize/types';
import { Attributes, CreationAttributes } from '../../db/models/doctor';
import { Doctor, DoctorRepositoryInterface } from '../../repositories/doctor';

class DoctorService {
  private _doctorsRepository: DoctorRepositoryInterface;

  constructor(doctorsRepository: DoctorRepositoryInterface) {
    this._doctorsRepository = doctorsRepository;
  }

  getAll(
    options?:
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

  getById(
    id: number,
    options?:
      | Omit<
          FindOptions<
            InferAttributes<
              Doctor,
              {
                omit: never;
              }
            >
          >,
          'where'
        >
      | undefined
  ) {
    return this._doctorsRepository.getDoctorById(id, options);
  }

  create(doctor: CreationAttributes) {
    return this._doctorsRepository.createDoctor(doctor);
  }

  update(id: number, doctor: Attributes) {
    return this._doctorsRepository.updateDoctor(id, doctor);
  }

  delete(id: number) {
    return this._doctorsRepository.deleteDoctor(id);
  }
}

export { DoctorService };
