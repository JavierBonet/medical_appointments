import { FindOptions, InferAttributes, NonNullFindOptions } from 'sequelize';
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
          previousAppointment.update(appointment);
          return { message: `Appointment ${id} updated successfully` };
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
