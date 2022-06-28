interface OptionalAdminUser {
  id?: number;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface AdminUser {
  id: number;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface OptionalDbAdminUser {
  id?: number;
  email: string;
  password: string;
}

interface DbAdminUser {
  id: number;
  email: string;
  password: string;
}

interface AdminUserErrors {
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface LoginAdminUser {
  email: string;
  password: string;
}

interface LocalStorageAdminUser {
  name: string;
}
