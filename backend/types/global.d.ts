import { AppointmentRepositoryInterface } from '../repositories/appointment';
import { CalendarRepositoryInterface } from '../repositories/calendar';
import { DayRepositoryInterface } from '../repositories/day';
import { DoctorRepositoryInterface } from '../repositories/doctor';
import { HospitalRepositoryInterface } from '../repositories/hospital';
import { HourRangeRepositoryInterface } from '../repositories/hourRange';

declare namespace NodeJS {
  export interface ProcessEnv {
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_LOGGING: string;
  }
}

interface DaysConfig {
  daysRepository: DayRepositoryInterface;
  hourRangesRepository: HourRangeRepositoryInterface;
}

interface CalendarConfig {
  calendarsRepository: CalendarRepositoryInterface;
  daysConfig: DaysConfig;
}

interface DoctorsConfig {
  doctorsRepository: DoctorRepositoryInterface;
  calendarsConfig: CalendarConfig;
}

interface PatientsConfig {
  patientsRepository: PatientRepositoryInterface;
  appointmentsRepository: AppointmentRepositoryInterface;
}

interface ApiRouterConfig {
  doctorsConfig: DoctorsConfig;
  patientsConfig: PatientsConfig;
  hospitalsRepository: HospitalRepositoryInterface;
  adminUsersRepository: AdminUserRepositoryInterface;
}

interface RouterConfig {
  apiRouterConfig: ApiRouterConfig;
}

interface GeneralRouterConfig {
  routerConfig: RouterConfig;
}
