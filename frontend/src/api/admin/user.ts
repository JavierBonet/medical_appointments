import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/admin';

function getAdminUsers() {}

function getAdminUserById(id: string) {}

function getAdminUserByEmail(email: string) {
  const url = `${baseUrl}/getByEmail/${email}`;

  return axios
    .get<DbAdminUser>(url)
    .then((response) => {
      const patient = response.data;
      return patient;
    })
    .catch((error) => {
      if (error.response.status == 404) {
        return undefined;
      } else {
        throw error.response.data.message;
      }
    });
}

function login(patient: LoginAdminUser) {
  const url = `${baseUrl}/login`;
  const { email, password } = patient;

  return axios
    .post(url, { email, password })
    .then((response) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
}

function doesAdminUserAlreadyExist(email: string) {
  const url = `${baseUrl}/getByEmail/${email}`;

  return axios
    .get(url)
    .then(() => {
      return true;
    })
    .catch((error) => {
      if (error.response.status == 404) {
        return false;
      } else {
        throw error.response.data.message;
      }
    });
}

function saveAdminUser(patient: OptionalDbAdminUser) {
  let promise: Promise<any>;
  let successMessage = '';
  if (patient.id) {
    promise = axios.put<AdminUser>(`${baseUrl}/${patient.id}`, patient);
    successMessage = 'Admin user updated successfully';
  } else {
    promise = axios.post(baseUrl, patient);

    successMessage = 'Admin user created successfully';
  }
  return promise
    .then((_) => successMessage)
    .catch((error) => {
      throw error.response.data.message;
    });
}

function deleteAdminUser(id: number) {
  return axios
    .delete<string>(`${baseUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data.message;
    });
}

export {
  getAdminUsers,
  getAdminUserById,
  getAdminUserByEmail,
  login,
  doesAdminUserAlreadyExist,
  saveAdminUser,
  deleteAdminUser,
};
