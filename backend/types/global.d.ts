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

interface DaysRouterConfig {
  daysRepository: DayRepositoryInterface;
  hourRangesRepository: HourRangeRepositoryInterface;
}

interface CalendarRouterConfig {
  calendarsRepository: CalendarRepositoryInterface;
  daysRouterConfig: DaysRouterConfig;
}

interface DoctorsRouterConfig {
  doctorsRepository: DoctorRepositoryInterface;
  calendarsRouterConfig: CalendarRouterConfig;
}

interface AdminRouterConfig {
  doctorsRouterConfig: DoctorsRouterConfig;
  hospitalsRepository: HospitalRepositoryInterface;
  adminUsersRepository: AdminUserRepositoryInterface;
}

interface PatientsRouterConfig {
  patientsRepository: PatientRepositoryInterface;
  appointmentsRepository: AppointmentRepositoryInterface;
  doctorsRepository: DoctorRepositoryInterface;
  hospitalsRepository: HospitalRepositoryInterface;
  calendarsRepository: CalendarRepositoryInterface;
}

interface ApiRouterConfig {
  adminRouterConfig: AdminRouterConfig;
  patientsRouterConfig: PatientsRouterConfig;
}

interface RouterConfig {
  apiRouterConfig: ApiRouterConfig;
}

interface GeneralRouterConfig {
  routerConfig: RouterConfig;
}
