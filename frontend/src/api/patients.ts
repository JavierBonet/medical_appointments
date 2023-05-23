import axios from 'axios';

// To always send cookies while making requests
axios.defaults.withCredentials = true;

const baseUrl = 'http://localhost:3000/api/patients';

function getPatients() {}

function getPatientById(id: string) {}

async function getPatientByEmail(email: string) {
  const url = `${baseUrl}/getByEmail/${email}`;

  return axios
    .get<DbPatient>(url)
    .then((response) => {
      const patient = response.data;
      return patient;
    })
    .catch((error) => {
      if (error.response.status === 404) {
        return undefined;
      } else {
        throw error.response.data.message;
      }
    });
}

async function login(patient: LoginPatient) {
  const url = `${baseUrl}/login`;
  const { email, password } = patient;

  return axios
    .post(url, { email, password })
    .then((response) => true)
    .catch(() => false);
}

async function doesPatientAlreadyExist(email: string) {
  const url = `${baseUrl}/getByEmail/${email}`;

  return axios
    .get(url)
    .then(() => true)
    .catch((error) => {
      if (error.response.status === 404) {
        return false;
      } else {
        throw error.response.data.message;
      }
    });
}

async function savePatient(patient: OptionalDbPatient) {
  let promise: Promise<any>;
  let successMessage = '';
  if (patient.id) {
    promise = axios.put<Patient>(`${baseUrl}/${patient.id}`, patient);
    successMessage = 'Patient updated successfully';
  } else {
    promise = axios.post(baseUrl, patient);

    successMessage = 'Patient created successfully';
  }
  return promise
    .then((_) => successMessage)
    .catch((error) => {
      throw error.response.data.message;
    });
}

async function deletePatient(id: number) {
  return axios
    .delete<string>(`${baseUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data.message;
    });
}

export { getPatients, getPatientById, getPatientByEmail, login, doesPatientAlreadyExist, savePatient, deletePatient };
