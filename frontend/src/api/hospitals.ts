import axios from 'axios';

// To always send cookies while making requests
axios.defaults.withCredentials = true;

const baseUrl = 'http://localhost:3000/api/patients/hospitals';

function getHospitals(includeDoctors: boolean) {
  let url: string = includeDoctors ? `${baseUrl}?includeDoctors=true` : baseUrl;
  return axios
    .get<Hospital[]>(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      const { status, data } = error.response;
      const returnObject = { statusCode: status, message: data.message };

      throw returnObject;
    });
}

export { getHospitals };
