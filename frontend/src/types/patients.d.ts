interface OptionalPatient {
  id?: number;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface Patient {
  id: number;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface OptionalDbPatient {
  id?: number;
  email: string;
  password: string;
}

interface DbPatient {
  id: number;
  email: string;
  password: string;
}

interface PatientErrors {
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface LoginPatient {
  email: string;
  password: string;
}
