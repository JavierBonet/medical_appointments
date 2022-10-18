import axios from 'axios';

const baseUrl: string = 'http://localhost:3000/api/patients/appointments';

function getAppointments(): Promise<Appointment[]> {
  return axios.get<Appointment[]>(baseUrl).then((response) => response.data);
}

function saveAppointment(appointment: OptionalAppointment) {
  return axios
    .post<Appointment>(baseUrl, appointment)
    .then((response) => response.data);
}

function deleteAppointment(appointmentId: number) {
  return axios
    .delete(`${baseUrl}/${appointmentId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data.message;
    });
}

export { getAppointments, saveAppointment, deleteAppointment };
