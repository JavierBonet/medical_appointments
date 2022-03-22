import { FindOptions, InferAttributes, ValidationError } from 'sequelize';
import Hospital, {
  CreationAttributes,
  Attributes,
} from '../db/models/hospital';

const HospitalRepository = {
  getAll: function getAll(
    options?: FindOptions<InferAttributes<Hospital, { omit: never }>>
  ) {
    return Hospital.findAll(options);
  },

  getHospitalById: function getHospitalById(
    id: number,
    options?:
      | Omit<
          FindOptions<
            InferAttributes<
              Hospital,
              {
                omit: never;
              }
            >
          >,
          'where'
        >
      | undefined
  ) {
    return Hospital.findByPk(id, options);
  },

  createHospital: function createHospital(hospital: CreationAttributes) {
    return Hospital.create(hospital);
  },

  updateHospital: function updateHospital(
    id: number,
    hospital: Attributes
  ): Promise<{ message: string }> {
    return HospitalRepository.getHospitalById(id)
      .then((previousHospital) => {
        if (previousHospital) {
          return previousHospital
            .update(hospital)
            .then((_) => ({ message: `Hospital ${id} updated successfully` }))
            .catch((err: Error) => {
              let message;
              if (err instanceof ValidationError && err.errors) {
                message = err.errors.map((error) => error.message).join('\n');
              } else {
                message = err.message;
              }
              throw { message };
            });
        } else {
          return { message: `Unable to find hospital ${id}` };
        }
      })
      .catch((err: Error) => {
        throw { message: err.message };
      });
  },

  deleteHospital: function deleteHospital(id: number) {
    return HospitalRepository.getHospitalById(id).then((hospital) => {
      if (hospital) {
        hospital.destroy();
        return { message: `Hospital ${id} deleted successfully` };
      } else {
        return { message: `Unable to find hospital ${id}` };
      }
    });
  },
};

export type HospitalRepositoryInterface = typeof HospitalRepository;

function createHospitalsRepository(): HospitalRepositoryInterface {
  const repository: HospitalRepositoryInterface =
    Object.create(HospitalRepository);
  return repository;
}

export { createHospitalsRepository, Hospital };
