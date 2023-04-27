import { createDoctor, createHospital } from '../../../admin/__tests__/utils/factory';
import { hours } from '../../../admin/doctor/calendar/day/dayUtils';

const generateId = () => Math.floor(Math.random() * 1000);

const getDate = (dateNumber?: string) => {
  const date = new Date();
  dateNumber = dateNumber ?? date.getDate().toString();
  return new Date(`${date.getMonth() + 1}/${dateNumber}/${date.getFullYear()}`);
};

interface AppointmentParameters {
  id?: number;
  dateNumber?: string;
  hour?: string;
}

export function createAppointment({ id, dateNumber, hour }: AppointmentParameters): Appointment {
  const doctor = createDoctor();
  const hospital = createHospital({});
  const date = getDate(dateNumber);
  const appointment: Appointment = {
    id: id ?? generateId(),
    date: date.toLocaleDateString(),
    hour: hour ?? hours[Math.floor(Math.random() * hours.length)],
    dayOfTheWeek: date.toLocaleDateString('en', { weekday: 'long' }),
    doctorId: doctor.id,
    hospitalId: hospital.id,
    patientId: generateId(),
    Doctor: doctor,
    Hospital: hospital,
  };

  return appointment;
}
