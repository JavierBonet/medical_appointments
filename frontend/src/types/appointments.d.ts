interface Appointment {
  id: number;
  date: string;
  hour: string;
  dayOfTheWeek: string;
  doctorId: number;
  hospitalId: number;
  patientId: number;
  Doctor: Doctor;
  Hospital: Hospital;
}

interface OptionalAppointment {
  id?: number;
  date: string;
  hour: string;
  dayOfTheWeek: string;
  doctorId: number;
  hospitalId: number;
  patientId?: number;
}
