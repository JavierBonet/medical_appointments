import axios from 'axios';

// To always send cookies while making requests
axios.defaults.withCredentials = true;

const baseUrl = 'http://localhost:3000/api/patients/doctors';

function getDoctors() {
  return axios.get<Doctor[]>(baseUrl).then((response) => {
    return response.data;
  });
}

export { getDoctors };
