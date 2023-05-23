import axios from 'axios';

// To always send cookies while making requests
axios.defaults.withCredentials = true;

function getBaseUrl(doctorId: number, hospitalId: number) {
  return `http://localhost:3000/api/patients/calendar/${hospitalId}/${doctorId}`;
}

async function getCalendarByDoctorAndHospitalId(doctorId: number, hospitalId: number) {
  return axios.get<Calendar>(getBaseUrl(doctorId, hospitalId)).then((response) => {
    return response.data;
  });
}

export { getCalendarByDoctorAndHospitalId };
