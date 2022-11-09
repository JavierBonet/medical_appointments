import { Request, Router as ExpressRouter } from 'express';
import {
  Day,
  DayRepositoryInterface,
} from '../../../../../../repositories/day';
import { HourRange } from '../../../../../../repositories/hourRange';
import { DayService } from '../../../../../../services/admin/dayService';
import { DaysRouterConfig } from '../../../../../../types/global';
import { createHourRangeRouter } from './hourRange/hourRangeRouter';

let _router: ExpressRouter;
let _dayService: DayService;

const DayRouter = {
  init: function init({
    daysRepository,
    hourRangesRepository,
  }: DaysRouterConfig) {
    _dayService = new DayService(daysRepository);
    _router = ExpressRouter({ mergeParams: true });
    const hourRangeRouter = createHourRangeRouter(hourRangesRepository);

    _router.use('/:dayId/hourRanges', hourRangeRouter);

    _router.get('/', (req: Request<{ calendarId: string }>, res) => {
      const calendarId = req.params.calendarId;
      _dayService
        .getAll({
          where: { calendarId: calendarId },
          include: HourRange,
          order: [[HourRange, 'id', 'ASC']],
        })
        .then((days: Day[]) => res.send(days).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.get('/:dayId', (req, res) => {
      const dayId = parseInt(req.params.dayId);
      _dayService
        .getById(dayId, { include: HourRange })
        .then((day) => {
          if (day) {
            res.send(day).end();
          } else {
            res.status(404).send({ message: 'Day not found' }).end();
          }
        })
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.post('/', (req, res) => {
      _dayService
        .create(req.body)
        .then((day) => res.status(201).send(day).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.put('/:dayId', (req, res) => {
      const dayId = parseInt(req.params.dayId);
      _dayService
        .update(dayId, req.body)
        .then((data) => res.send(data.message).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.delete('/:dayId', (req, res) => {
      const dayId = parseInt(req.params.dayId);
      _dayService
        .delete(dayId)
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

type RouterInterface = typeof DayRouter;

function createDayRouter(daysConfig: DaysRouterConfig) {
  let dayRouter: RouterInterface = Object.create(DayRouter);
  dayRouter.init(daysConfig);
  return dayRouter.getRouter();
}

export { createDayRouter };
