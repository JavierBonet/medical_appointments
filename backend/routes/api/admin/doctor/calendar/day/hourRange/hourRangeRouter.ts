import { Request, Router as ExpressRouter } from 'express';
import { HourRangeRepositoryInterface } from '../../../../../../../repositories/hourRange';

let _router: ExpressRouter;
let _hourRangesRepository: HourRangeRepositoryInterface;

const HourRangeRouter = {
  init: function init(hourRangesRepository: HourRangeRepositoryInterface) {
    _hourRangesRepository = hourRangesRepository;
    _router = ExpressRouter({ mergeParams: true });

    /**
     * ME PARECE QUE ESTAS 2 RUTAS NO SON NECESARIAS YA QUE LO ÚNICO
     * QUE HARÉ SERÁ CREAR, ACTUALIZAR Y BORRAR HOUR RANGES.
     * LA OBTENCIÓN DE LOS HOUR RANGES SE HACE DIRECTAMENTE CON CADA DAY
     */

    // _router.get('/', (req: Request<{ dayId: string }>, res) => {
    //   const dayId = req.params.dayId;
    //   _hourRangesRepository
    //     .getAll({
    //       where: { dayId: dayId },
    //     })
    //     .then((hourRanges: HourRange[]) => {
    //       res.send(hourRanges).end();
    //     })
    //     .catch((err: Error) => {
    //       res.status(400).send(err.message).end();
    //     });
    // });

    // _router.get('/:hourRangeId', (req, res) => {
    //   const hourRangeId = parseInt(req.params.hourRangeId);
    //   _hourRangesRepository
    //     .getHourRangeById(hourRangeId)
    //     .then((hourRange) => {
    //       if (hourRange) {
    //         res.send(hourRange).end();
    //       } else {
    //         res.status(404).send({ message: 'HourRange not found' }).end();
    //       }
    //     })
    //     .catch((err: Error) => {
    //       res.status(400).send(err.message).end();
    //     });
    // });

    _router.post('/', (req, res) => {
      _hourRangesRepository
        .createHourRange(req.body)
        .then((hourRange) => {
          res.status(201).send(hourRange).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.put('/:hourRangeId', (req, res) => {
      const hourRangeId = parseInt(req.params.hourRangeId);
      _hourRangesRepository
        .updateHourRange(hourRangeId, req.body)
        .then((data) => {
          res.send(data.message).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.delete('/:hourRangeId', (req, res) => {
      const hourRangeId = parseInt(req.params.hourRangeId);
      _hourRangesRepository
        .deleteHourRange(hourRangeId)
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

type RouterInterface = typeof HourRangeRouter;

function createHourRangeRouter(
  hourRangeRepository: HourRangeRepositoryInterface
) {
  let hourRangeRouter: RouterInterface = Object.create(HourRangeRouter);
  hourRangeRouter.init(hourRangeRepository);
  return hourRangeRouter.getRouter();
}

export { createHourRangeRouter };
