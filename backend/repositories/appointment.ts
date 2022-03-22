import { FindOptions, InferAttributes, ValidationError } from 'sequelize';
import Appointment, {
  Attributes,
  CreationAttributes,
} from '../db/models/appointment';

const AppointmentRepository = {
  getAll: function getAll(
    options?: FindOptions<InferAttributes<Appointment, { omit: never }>>
  ) {
    return Appointment.findAll(options);
  },

  getAppointmentById: function getAppointmentlById(
    id: number,
    options?:
      | Omit<
          FindOptions<
            InferAttributes<
              Appointment,
              {
                omit: never;
              }
            >
          >,
          'where'
        >
      | undefined
  ) {
    return Appointment.findByPk(id, options);
  },

  createAppointment: function createAppointment(
    appointment: CreationAttributes
  ) {
    return Appointment.create(appointment);
  },

  updateAppointment: function updateAppointment(
    id: number,
    appointment: Attributes
  ) {
    return AppointmentRepository.getAppointmentById(id).then(
      (previousAppointment) => {
        if (previousAppointment) {
          return previousAppointment
            .update(appointment)
            .then((_) => ({
              message: `Appointment ${id} updated successfully`,
            }))
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
          return { message: `Unable to find appointment ${id}` };
        }
      }
    );
  },

  deleteAppointment: function deleteAppointment(id: number) {
    return AppointmentRepository.getAppointmentById(id).then((appointment) => {
      if (appointment) {
        appointment.destroy();
        return { message: `Appointment ${id} deleted successfully` };
      } else {
        return { message: `Unable to find appointment ${id}` };
      }
    });
  },
};

export type AppointmentRepositoryInterface = typeof AppointmentRepository;

function createAppointmentsRepository() {
  const repository: AppointmentRepositoryInterface = Object.create(
    AppointmentRepository
  );
  return repository;
}

export { createAppointmentsRepository, Appointment };
