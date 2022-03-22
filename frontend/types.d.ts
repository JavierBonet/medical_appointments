interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  zip_code: number;
}

interface OptionalHospital {
  id?: number;
  name: string;
  address: string;
  phone: string;
  zip_code: number;
}

interface Doctor {
  id: number;
  name: string;
  surname: string;
  age?: number;
  speciality: string;
}

interface OptionalDoctor {
  id?: number;
  name: string;
  surname: string;
  age?: number;
  speciality: string;
}
