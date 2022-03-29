import axios from 'axios';

function getBaseUrl(doctorId: string) {
  return `http://localhost:3000/api/doctors/${doctorId}/calendars`;
}

function getCalendars(doctorId: string) {
  return axios.get<Calendar[]>(getBaseUrl(doctorId)).then((response) => {
    return response.data;
  });
}

function getCalendar(doctorId: string, id: string) {
  return axios
    .get<Calendar>(`${getBaseUrl(doctorId)}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data.message;
    });
}

function saveCalendar(doctorId: string, calendar: OptionalCalendar) {
  let promise: Promise<any>;
  let successMessage = '';
  if (calendar.id) {
    promise = axios.put<Calendar>(
      `${getBaseUrl(doctorId)}/${calendar.id}`,
      calendar
    );
    successMessage = 'Calendar updated successfully';
  } else {
    promise = axios.post(getBaseUrl(doctorId), calendar);

    successMessage = 'Calendar created successfully';
  }
  return promise
    .then((_) => successMessage)
    .catch((error) => {
      console.log(error);

      throw error.response.data.message;
    });
}

function deleteCalendar(doctorId: string, id: number) {
  return axios
    .delete<string>(`${getBaseUrl(doctorId)}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data.message;
    });
}

export { getCalendars, getCalendar, saveCalendar, deleteCalendar };
