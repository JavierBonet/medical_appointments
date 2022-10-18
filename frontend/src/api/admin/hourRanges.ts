import axios from 'axios';
import { getHourByIndex } from '../../components/admin/doctor/calendar/day/dayUtils';

// To always send cookies while making requests
axios.defaults.withCredentials = true;

function getBaseUrl(doctorId: string, calendarId: string, dayId: string) {
  return `http://localhost:3000/api/admin/doctors/${doctorId}/calendars/${calendarId}/days/${dayId}/hourRanges`;
}

function create(
  doctorId: string,
  calendarId: string,
  dayId: string,
  hourRange: OptionalHourRange
) {
  let message: string;

  return axios
    .post<Day>(getBaseUrl(doctorId, calendarId, dayId), hourRange)
    .catch((err: Error) => {
      message = err.message;
    });
}

export { create };
