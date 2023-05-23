import axios from 'axios';

// To always send cookies while making requests
axios.defaults.withCredentials = true;

const baseUrl = 'http://localhost:3000/api/admin/doctors';

async function getDoctors() {
  return axios
    .get<Doctor[]>(baseUrl)
    .then((response) => response.data)
    .catch((error) => {
      const statusCode = error.response.status;
      if (statusCode === 401) {
        throw statusCode;
      } else {
        throw error.response.data.message;
      }
    });
}

async function getDoctor(id: string) {
  return axios
    .get<Doctor>(`${baseUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      const statusCode = error.response.status;
      if (statusCode === 401) {
        throw statusCode;
      } else {
        throw error.response.data.message;
      }
    });
}

async function saveDoctor(doctor: OptionalDoctor) {
  let promise: Promise<any>;
  let successMessage = '';
  if (doctor.id) {
    promise = axios.put<Doctor>(`${baseUrl}/${doctor.id}`, doctor);
    successMessage = 'Doctor updated successfully';
  } else {
    promise = axios.post(baseUrl, doctor);

    successMessage = 'Doctor created successfully';
  }
  return promise
    .then((_) => successMessage)
    .catch((error) => {
      throw error.response.data.message;
    });
}

async function deleteDoctor(id: number) {
  return axios
    .delete<string>(`${baseUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data.message;
    });
}

export { getDoctors, getDoctor, saveDoctor, deleteDoctor };
