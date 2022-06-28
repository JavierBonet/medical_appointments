import axios from 'axios';

// To always send cookies while making requests
axios.defaults.withCredentials = true;

const baseUrl = 'http://localhost:3000/api/admin/doctors';

function getDoctors() {
  return axios.get<Doctor[]>(baseUrl).then((response) => {
    return response.data;
  });
}

function getDoctor(id: string) {
  return axios
    .get<Doctor>(`${baseUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data.message;
    });
}

function saveDoctor(doctor: OptionalDoctor) {
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

function deleteDoctor(id: number) {
  return axios
    .delete<string>(`${baseUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data.message;
    });
}

export { getDoctors, getDoctor, saveDoctor, deleteDoctor };
