import {
  FindOptions,
  InferAttributes,
  NonNullFindOptions,
} from 'sequelize/types';
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

  updateHospital: function updateHospital(id: number, hospital: Attributes) {
    return HospitalRepository.getHospitalById(id).then((previousHospital) => {
      if (previousHospital) {
        previousHospital.update(hospital);
        return { message: `Hospital ${id} updated successfully` };
      } else {
        return { message: `Unable to find hospital ${id}` };
      }
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
