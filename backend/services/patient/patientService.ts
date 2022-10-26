import { FindOptions, InferAttributes } from 'sequelize/types';
import { Attributes, CreationAttributes } from '../../db/models/patient';
import {
  Patient,
  PatientRepositoryInterface,
} from '../../repositories/patient';
import { hash } from 'bcrypt';

const SALT_ROUNDS = 10;

class PatientService {
  private _patientsRepository: PatientRepositoryInterface;

  constructor(patientsRepository: PatientRepositoryInterface) {
    this._patientsRepository = patientsRepository;
  }

  getAll(
    options:
      | FindOptions<
          InferAttributes<
            Patient,
            {
              omit: never;
            }
          >
        >
      | undefined
  ) {
    return this._patientsRepository.getAll(options);
  }

  get(
    id: number,
    options?:
      | Omit<
          FindOptions<
            InferAttributes<
              Patient,
              {
                omit: never;
              }
            >
          >,
          'where'
        >
      | undefined
  ) {
    return this._patientsRepository.getPatientById(id, options);
  }

  getByEmail(email: string) {
    return this._patientsRepository.getPatientByEmail(email);
  }

  async create(patient: CreationAttributes) {
    const plainPassword = patient.password;
    const password = await hash(plainPassword, SALT_ROUNDS);
    patient.password = password;

    return this._patientsRepository.createPatient(patient);
  }

  update(id: number, patient: Attributes) {
    return this._patientsRepository.updatePatient(id, patient);
  }

  delete(id: number) {
    return this._patientsRepository.deletePatient(id);
  }
}

export { PatientService };
