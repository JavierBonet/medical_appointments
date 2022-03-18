import { FindOptions, InferAttributes, NonNullFindOptions } from 'sequelize';
import Doctor, { Attributes, CreationAttributes } from '../db/models/doctor';

const DoctorRepository = {
  getAll: function getAll(
    options?: FindOptions<InferAttributes<Doctor, { omit: never }>>
  ) {
    return Doctor.findAll(options);
  },

  getDoctorById: function getDoctorlById(
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
    return Doctor.findByPk(id, options);
  },

  createDoctor: function createDoctor(doctor: CreationAttributes) {
    return Doctor.create(doctor);
  },

  updateDoctor: function updateDoctor(id: number, doctor: Attributes) {
    return DoctorRepository.getDoctorById(id).then((previousDoctor) => {
      if (previousDoctor) {
        previousDoctor.update(doctor);
        return { message: `Doctor ${id} updated successfully` };
      } else {
        return { message: `Unable to find doctor ${id}` };
      }
    });
  },

  deleteDoctor: function deleteDoctor(id: number) {
    return DoctorRepository.getDoctorById(id).then((doctor) => {
      if (doctor) {
        doctor.destroy();
        return { message: `Doctor ${id} deleted successfully` };
      } else {
        return { message: `Unable to find doctor ${id}` };
      }
    });
  },
};

export type DoctorRepositoryInterface = typeof DoctorRepository;

function createDoctorsRepository() {
  const repository: DoctorRepositoryInterface = Object.create(DoctorRepository);
  return repository;
}

export { createDoctorsRepository, Doctor };
