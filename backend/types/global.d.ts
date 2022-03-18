import { AppointmentRepositoryInterface } from '../repositories/appointment';
import { CalendarRepositoryInterface } from '../repositories/calendar';
import { DayRepositoryInterface } from '../repositories/day';
import { DoctorRepositoryInterface } from '../repositories/doctor';
import { HospitalRepositoryInterface } from '../repositories/hospital';

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

interface CalendarConfig {
  calendarsRepository: CalendarRepositoryInterface;
  daysRepository: DayRepositoryInterface;
}

interface DoctorsConfig {
  doctorsRepository: DoctorRepositoryInterface;
  appointmentsRepository: AppointmentRepositoryInterface;
  calendarsConfig: CalendarConfig;
}

interface ApiRouterConfig {
  doctorsConfig: DoctorsConfig;
  hospitalsRepository: HospitalRepositoryInterface;
}

interface RouterConfig {
  apiRouterConfig: ApiRouterConfig;
}

interface GeneralRouterConfig {
  routerConfig: RouterConfig;
}
