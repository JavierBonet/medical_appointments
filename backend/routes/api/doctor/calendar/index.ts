import { Request, Router as ExpressRouter } from 'express';
import {
  Calendar,
  CalendarRepositoryInterface,
} from '../../../../repositories/calendar';
import { Day } from '../../../../repositories/day';
import { Doctor } from '../../../../repositories/doctor';
import { Hospital } from '../../../../repositories/hospital';
import { HourRange } from '../../../../repositories/hourRange';
import { CalendarConfig } from '../../../../types/global';
import { createRouter as createDaysRouter } from './day';

let _router: ExpressRouter;
let _calendarsRepository: CalendarRepositoryInterface;

const Router = {
  init: function init(calendarsConfig: CalendarConfig) {
    const { calendarsRepository, daysRepository } = calendarsConfig;
    _calendarsRepository = calendarsRepository;
    _router = ExpressRouter({ mergeParams: true });
    const daysRouter = createDaysRouter(daysRepository);

    _router.use('/:calendarId/days', daysRouter);

    _router.get('/', (req: Request<{ doctorId: string }>, res) => {
      _calendarsRepository
        .getAll({
          include: [
            {
              model: Day,
              include: [HourRange],
            },
          ],
        })
        .then((calendars: Calendar[]) => {
          res.send(calendars).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.get('/:calendarId', (req, res) => {
      const calendarId = parseInt(req.params.calendarId);
      _calendarsRepository
        .getCalendarById(calendarId, { include: [Doctor, Hospital] })
        .then((calendar) => {
          if (calendar) {
            res.send(calendar).end();
          } else {
            res.status(404).send({ message: 'Calendar not found' }).end();
          }
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.post('/', (req, res) => {
      _calendarsRepository
        .createCalendar(req.body)
        .then((calendar) => {
          res.status(201).send(calendar).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.put('/:calendarId', (req, res) => {
      const calendarId = parseInt(req.params.calendarId);
      _calendarsRepository
        .updateCalendar(calendarId, req.body)
        .then((data) => {
          res.send(data.message).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.delete('/:calendarId', (req, res) => {
      const calendarId = parseInt(req.params.calendarId);
      _calendarsRepository
        .deleteCalendar(calendarId)
        .then((data) => {
          res.send(data.message).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });
  },
  getRouter: function getRouter() {
    return _router;
  },
};

type RouterInterface = typeof Router;

function createRouter(calendarsConfig: CalendarConfig) {
  let calendarRouter: RouterInterface = Object.create(Router);
  calendarRouter.init(calendarsConfig);
  return calendarRouter.getRouter();
}

export { createRouter };
