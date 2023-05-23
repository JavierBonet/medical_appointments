import axios from 'axios';

const baseUrl: string = 'http://localhost:3000/api/patients/appointments';

async function getPatientAppointments(): Promise<Appointment[]> {
  return axios.get<Appointment[]>(baseUrl).then((response) => response.data);
}

async function getAppointments(hospitalId: number, doctorId: number) {
  return axios.get<Appointment[]>(`${baseUrl}/${hospitalId}/${doctorId}`).then((response) => response.data);
}

async function saveAppointment(appointment: OptionalAppointment) {
  return axios.post<Appointment>(baseUrl, appointment).then((response) => response.data);
}

async function deleteAppointment(appointmentId: number) {
  return axios
    .delete(`${baseUrl}/${appointmentId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data.message;
    });
}

export { getPatientAppointments, getAppointments, saveAppointment, deleteAppointment };
