import { Request, Router as ExpressRouter } from 'express';
import { Calendar } from '../../../../../repositories/calendar';
import { Day } from '../../../../../repositories/day';
import { Doctor } from '../../../../../repositories/doctor';
import { Hospital } from '../../../../../repositories/hospital';
import { HourRange } from '../../../../../repositories/hourRange';
import { CalendarService } from '../../../../../services/admin/calendarService';
import { CalendarRouterConfig } from '../../../../../types/global';
import { createDayRouter } from './day/DayRouter';

let _router: ExpressRouter;
let _calendarService: CalendarService;

const CalendarRouter = {
  init: function init(calendarsConfig: CalendarRouterConfig) {
    const { calendarsRepository, daysRouterConfig } = calendarsConfig;
    _calendarService = new CalendarService(calendarsRepository);
    _router = ExpressRouter({ mergeParams: true });
    const dayRouter = createDayRouter(daysRouterConfig);

    _router.use('/:calendarId/days', dayRouter);

    _router.get('/', (req: Request<{ doctorId: string }>, res) => {
      const doctorId = parseInt(req.params.doctorId);
      _calendarService
        .getAll({
          where: { doctorId: doctorId },
          include: [
            {
              model: Day,
              include: [HourRange],
            },
            Doctor,
            Hospital,
          ],
        })
        .then((calendars: Calendar[]) => res.send(calendars).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.get('/:calendarId', (req, res) => {
      const calendarId = parseInt(req.params.calendarId);
      _calendarService
        .getById(calendarId, { include: [Doctor, Hospital] })
        .then((calendar) => {
          if (calendar) {
            res.send(calendar).end();
          } else {
            res.status(404).send({ message: 'Calendar not found' }).end();
          }
        })
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.post('/', (req, res) => {
      _calendarService
        .create(req.body)
        .then((calendar) => res.status(201).send(calendar).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.put('/:calendarId', (req, res) => {
      const calendarId = parseInt(req.params.calendarId);
      _calendarService
        .update(calendarId, req.body)
        .then((data) => res.send(data.message).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.delete('/:calendarId', (req, res) => {
      const calendarId = parseInt(req.params.calendarId);
      _calendarService
        .delete(calendarId)
        .then((data) => res.send(data.message).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });
  },

  getRouter: function getRouter() {
    return _router;
  },
};

type RouterInterface = typeof CalendarRouter;

function createCalendarRouter(calendarsConfig: CalendarRouterConfig) {
  let calendarRouter: RouterInterface = Object.create(CalendarRouter);
  calendarRouter.init(calendarsConfig);
  return calendarRouter.getRouter();
}

export { createCalendarRouter };
