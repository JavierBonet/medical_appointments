const dotenv = require('dotenv');
import { createAppointmentsRepository } from './repositories/appointment';
import { createCalendarsRepository } from './repositories/calendar';
import { createDaysRepository } from './repositories/day';
import { createDoctorsRepository } from './repositories/doctor';
import { createHospitalsRepository } from './repositories/hospital';
import Server, { ServerInterface } from './server';
import { GeneralRouterConfig } from './types/global';

dotenv.config();

let server: ServerInterface = Object.create(Server);

const config: GeneralRouterConfig = {
  routerConfig: {
    apiRouterConfig: {
      doctorsConfig: {
        doctorsRepository: createDoctorsRepository(),
        appointmentsRepository: createAppointmentsRepository(),
        calendarsConfig: {
          calendarsRepository: createCalendarsRepository(),
          daysRepository: createDaysRepository(),
        },
      },
      hospitalsRepository: createHospitalsRepository(),
    },
  },
};

server.init(config);

server.start();
