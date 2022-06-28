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
      adminRouterConfig: {
        doctorsRouterConfig: {
          doctorsRepository: createDoctorsRepository(),
          calendarsRouterConfig: {
            calendarsRepository: createCalendarsRepository(),
            daysRouterConfig: {
              daysRepository: createDaysRepository(),
              hourRangesRepository: createHourRangesRepository(),
            },
          },
        },
        hospitalsRepository: createHospitalsRepository(),
        adminUsersRepository: createAdminUsersRepository(),
      },
      patientsRouterConfig: {
        appointmentsRepository: createAppointmentsRepository(),
        patientsRepository: createPatientsRepository(),
      },
    },
  },
};

server.init(config);

server.start();
