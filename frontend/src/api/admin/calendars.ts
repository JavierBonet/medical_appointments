import axios from 'axios';
import { getDoctor } from './doctors';
import { getHospitals } from './hospitals';

// To always send cookies while making requests
axios.defaults.withCredentials = true;

function getBaseUrl(doctorId: string) {
  return `http://localhost:3000/api/admin/doctors/${doctorId}/calendars`;
}

function getAssociationsBaseUrl(doctorId: string) {
  return `http://localhost:3000/api/admin/doctors/${doctorId}/associations/hospitals`;
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

/**
 * Checks if there exist any hospital other than the ones linked to the doctor
 * via its calendars
 *
 * @param doctorId Doctor id
 * @returns True if there is any hospital that isn't linked to the doctor
 */
function areAvailableHospitals(doctorId: string) {
  return getAvailableHospitals(doctorId).then((hospitals) => {
    return hospitals.length != 0;
  });
}

function getAvailableHospitals(doctorId: string) {
  return getHospitals(false).then((hospitals) => {
    return getDoctor(doctorId).then((doctor) => {
      const usedHospitalIds = new Set(
        doctor.Calendars.map((calendar) => calendar.hospitalId)
      );

      return hospitals.filter((hospital) => !usedHospitalIds.has(hospital.id));
    });
  });
}

function saveCalendar(
  doctorId: string,
  calendar: OptionalCalendar,
  oldHospitalId: number | undefined
) {
  let promise: Promise<any>;
  let successMessage = '';
  const hospitalId = calendar.hospitalId;
  if (calendar.id) {
    promise = axios.put<Calendar>(
      `${getBaseUrl(doctorId)}/${calendar.id}`,
      calendar
    );

    if (oldHospitalId) {
      /*
       * When changing calendar related hospital, I have to:
       * - Create a new relation between the doctor and the new hospital
       * - Remove the previously created relation
       */
      axios.put(
        `${getAssociationsBaseUrl(doctorId)}/${oldHospitalId}/${hospitalId}`
      );
    }

    successMessage = 'Calendar updated successfully';
  } else {
    promise = axios.post(getBaseUrl(doctorId), calendar);

    /*
     * When creating a new calendar, I have to create a new relation between
     * the doctor and the hospital (calendar.hospitalId)
     */
    axios.post(`${getAssociationsBaseUrl(doctorId)}/${hospitalId}`);

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

export {
  getCalendars,
  getCalendar,
  areAvailableHospitals,
  getAvailableHospitals,
  saveCalendar,
  deleteCalendar,
};
