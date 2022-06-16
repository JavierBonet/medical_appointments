const dotenv = require('dotenv');
import { createAdminUsersRepository } from './repositories/admin_user';
import { createAppointmentsRepository } from './repositories/appointment';
import { createCalendarsRepository } from './repositories/calendar';
import { createDaysRepository } from './repositories/day';
import { createDoctorsRepository } from './repositories/doctor';
import { createHospitalsRepository } from './repositories/hospital';
import { createHourRangesRepository } from './repositories/hourRange';
import { createPatientsRepository } from './repositories/patient';
import Server, { ServerInterface } from './server';
import { GeneralRouterConfig } from './types/global';

dotenv.config();

let server: ServerInterface = Object.create(Server);

const config: GeneralRouterConfig = {
  routerConfig: {
    apiRouterConfig: {
      doctorsConfig: {
        doctorsRepository: createDoctorsRepository(),
        calendarsConfig: {
          calendarsRepository: createCalendarsRepository(),
          daysConfig: {
            daysRepository: createDaysRepository(),
            hourRangesRepository: createHourRangesRepository(),
          },
        },
      },
      patientsConfig: {
        appointmentsRepository: createAppointmentsRepository(),
        patientsRepository: createPatientsRepository(),
      },
      hospitalsRepository: createHospitalsRepository(),
      adminUsersRepository: createAdminUsersRepository(),
    },
  },
};

server.init(config);

server.start();
