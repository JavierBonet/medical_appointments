import axios from 'axios';

// To always send cookies while making requests
axios.defaults.withCredentials = true;

const baseUrl = 'http://localhost:3000/api/admin/hospitals';

async function getHospitals(includeDoctors: boolean) {
  const url = includeDoctors ? `${baseUrl}?includeDoctors=true` : baseUrl;
  return axios
    .get<Hospital[]>(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      const statusCode = error.response.status;
      if (statusCode === 401) {
        throw statusCode;
      } else {
        throw error.response.data.message;
      }
    });
}

async function getHospital(id: string) {
  return axios
    .get<Hospital>(`${baseUrl}/${id}`)
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

async function saveHospital(hospital: OptionalHospital) {
  let promise: Promise<any>;
  let successMessage = '';
  if (hospital.id) {
    promise = axios.put<Hospital>(`${baseUrl}/${hospital.id}`, hospital);
    successMessage = 'Hospital updated successfully';
  } else {
    promise = axios.post(baseUrl, hospital);

    successMessage = 'Hospital created successfully';
  }
  return promise
    .then((_) => successMessage)
    .catch((error) => {
      throw error.response.data.message;
    });
}

async function deleteHospital(id: number) {
  return axios
    .delete<string>(`${baseUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data.message;
    });
}

export { getHospitals, getHospital, saveHospital, deleteHospital };
