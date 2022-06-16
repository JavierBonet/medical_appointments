import { FindOptions, InferAttributes, ValidationError } from 'sequelize';
import Patient, { Attributes, CreationAttributes } from '../db/models/patient';

const PatientRepository = {
  getAll: function getAll(
    options?: FindOptions<InferAttributes<Patient, { omit: never }>>
  ) {
    return Patient.findAll(options);
  },

  getPatientById: function getPatientlById(
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
    return Patient.findByPk(id, options);
  },

  getPatientByEmail: function getPatientByEmail(email: string) {
    return Patient.findOne({ where: { email: email } });
  },

  createPatient: function createPatient(patient: CreationAttributes) {
    return Patient.create(patient);
  },

  updatePatient: function updatePatient(id: number, patient: Attributes) {
    return PatientRepository.getPatientById(id).then((previousPatient) => {
      if (previousPatient) {
        return previousPatient
          .update(patient)
          .then((_) => ({ message: `Patient ${id} updated successfully` }))
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
        return { message: `Unable to find patient ${id}` };
      }
    });
  },

  deletePatient: function deletePatient(id: number) {
    return PatientRepository.getPatientById(id).then((patient) => {
      if (patient) {
        patient.destroy();
        return { message: `Patient ${id} deleted successfully` };
      } else {
        return { message: `Unable to find patient ${id}` };
      }
    });
  },
};

export type PatientRepositoryInterface = typeof PatientRepository;

function createPatientsRepository() {
  const repository: PatientRepositoryInterface =
    Object.create(PatientRepository);
  return repository;
}

export { createPatientsRepository, Patient };
