import { FindOptions, InferAttributes } from 'sequelize/types';
import { Attributes, CreationAttributes } from '../../db/models/appointment';
import {
  Appointment,
  AppointmentRepositoryInterface,
} from '../../repositories/appointment';

class AppointmentService {
  private _appointmentsRepository: AppointmentRepositoryInterface;

  constructor(appointmentsRepository: AppointmentRepositoryInterface) {
    this._appointmentsRepository = appointmentsRepository;
  }

  getAll(
    options:
      | FindOptions<
          InferAttributes<
            Appointment,
            {
              omit: never;
            }
          >
        >
      | undefined
  ) {
    return this._appointmentsRepository.getAll(options);
  }

  getAllByHospitalAndDoctor(hospitalId: number, doctorId: number) {
    return this._appointmentsRepository.getAllByHospitalAndDoctor(
      hospitalId,
      doctorId
    );
  }

  getAppointmentById(
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
    return this._appointmentsRepository.getAppointmentById(id, options);
  }

  create(appointment: CreationAttributes) {
    return this._appointmentsRepository.createAppointment(appointment);
  }

  update(id: number, appointment: Attributes) {
    return this._appointmentsRepository.updateAppointment(id, appointment);
  }

  delete(id: number) {
    return this._appointmentsRepository.deleteAppointment(id);
  }
}

export { AppointmentService };
