import { Router as ExpressRouter } from 'express';
import { HourRangeRepositoryInterface } from '../../../../../../../repositories/hourRange';
import { HourRangeService } from '../../../../../../../services/admin/hourRangeService';

let _router: ExpressRouter;
let _hourRangeService: HourRangeService;

const HourRangeRouter = {
  init: function init(hourRangesRepository: HourRangeRepositoryInterface) {
    _hourRangeService = new HourRangeService(hourRangesRepository);
    _router = ExpressRouter({ mergeParams: true });

    _router.post('/', (req, res) => {
      _hourRangeService
        .create(req.body)
        .then((hourRange) => res.status(201).send(hourRange).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.put('/:hourRangeId', (req, res) => {
      const hourRangeId = parseInt(req.params.hourRangeId);
      _hourRangeService
        .update(hourRangeId, req.body)
        .then((data) => res.send(data.message).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.delete('/:hourRangeId', (req, res) => {
      const hourRangeId = parseInt(req.params.hourRangeId);
      _hourRangeService
        .delete(hourRangeId)
        .then((data) => res.send(data.message).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });
  },
  getRouter: function getRouter() {
    return _router;
  },
};

type RouterInterface = typeof HourRangeRouter;

function createHourRangeRouter(
  hourRangeRepository: HourRangeRepositoryInterface
) {
  let hourRangeRouter: RouterInterface = Object.create(HourRangeRouter);
  hourRangeRouter.init(hourRangeRepository);
  return hourRangeRouter.getRouter();
}

export { createHourRangeRouter };
