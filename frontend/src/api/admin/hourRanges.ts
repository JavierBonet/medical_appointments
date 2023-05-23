import axios from 'axios';

// To always send cookies while making requests
axios.defaults.withCredentials = true;

function getBaseUrl(doctorId: string, calendarId: string, dayId: string) {
  return `http://localhost:3000/api/admin/doctors/${doctorId}/calendars/${calendarId}/days/${dayId}/hourRanges`;
}

async function create(doctorId: string, calendarId: string, dayId: string, hourRange: OptionalHourRange) {
  return axios.post<Day>(getBaseUrl(doctorId, calendarId, dayId), hourRange);
}

export { create };
