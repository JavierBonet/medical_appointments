import { FindOptions, InferAttributes, ValidationError } from 'sequelize';
import Doctor, { Attributes, CreationAttributes } from '../db/models/doctor';

const DoctorRepository = {
  getAll: function getAll(options?: FindOptions<InferAttributes<Doctor, { omit: never }>>) {
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
        return previousDoctor
          .update(doctor)
          .then((_) => ({ message: `Doctor ${id} updated successfully` }))
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

  addHospitalAssociation: function addHospitalAssociation(hospitalId: number, doctorId: number) {
    Doctor.findByPk(doctorId).then((doctor) => {
      if (doctor) {
        doctor.addHospital(hospitalId);
      } else {
        throw 'Doctor not found';
      }
    });
  },

  replaceHospitalAssociation: function replaceHospitalAssociation(
    previousHospitalId: number,
    hospitalId: number,
    doctorId: number
  ) {
    Doctor.findByPk(doctorId).then((doctor) => {
      if (doctor) {
        doctor.removeHospital(previousHospitalId);
        doctor.addHospital(hospitalId);
      } else {
        throw 'Doctor not found';
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
