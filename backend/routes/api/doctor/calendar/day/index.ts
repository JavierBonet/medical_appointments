import { Request, Router as ExpressRouter } from 'express';
import { Day, DayRepositoryInterface } from '../../../../../repositories/day';
import { HourRange } from '../../../../../repositories/hourRange';

let _router: ExpressRouter;
let _daysRepository: DayRepositoryInterface;

const Router = {
  init: function init(daysRepository: DayRepositoryInterface) {
    _daysRepository = daysRepository;
    _router = ExpressRouter({ mergeParams: true });

    _router.get('/', (req: Request<{ doctorId: string }>, res) => {
      _daysRepository
        .getAll({
          include: HourRange,
        })
        .then((days: Day[]) => {
          res.send(days).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.get('/:dayId', (req, res) => {
      const dayId = parseInt(req.params.dayId);
      _daysRepository
        .getDayById(dayId, { include: HourRange })
        .then((day) => {
          if (day) {
            res.send(day).end();
          } else {
            res.status(404).send({ message: 'Day not found' }).end();
          }
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.post('/', (req, res) => {
      _daysRepository
        .createDay(req.body)
        .then((day) => {
          res.status(201).send(day).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.put('/:dayId', (req, res) => {
      const dayId = parseInt(req.params.dayId);
      _daysRepository
        .updateDay(dayId, req.body)
        .then((data) => {
          res.send(data.message).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.delete('/:dayId', (req, res) => {
      const dayId = parseInt(req.params.dayId);
      _daysRepository
        .deleteDay(dayId)
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

function createRouter(dayRepository: DayRepositoryInterface) {
  let dayRouter: RouterInterface = Object.create(Router);
  dayRouter.init(dayRepository);
  return dayRouter.getRouter();
}

export { createRouter };
