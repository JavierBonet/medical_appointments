import { Router as ExpressRouter } from 'express';
import { CalendarRepositoryInterface } from '../../../../repositories/calendar';

let _router: ExpressRouter;
let _calendarsRepository: CalendarRepositoryInterface;

const CalendarRouter = {
  init: function init(calendarsRepository: CalendarRepositoryInterface) {
    _calendarsRepository = calendarsRepository;
    _router = ExpressRouter({ mergeParams: true });

    _router.get('/:hospitalId/:doctorId', (req, res) => {
      const doctorId = parseInt(req.params.doctorId);
      const hospitalId = parseInt(req.params.hospitalId);
      _calendarsRepository
        .getCalendarByDoctorAndHospitalId(doctorId, hospitalId)
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
  },

  getRouter: function getRouter() {
    return _router;
  },
};

type RouterInterface = typeof CalendarRouter;

function createCalendarRouter(
  calendarsRepository: CalendarRepositoryInterface
) {
  let calendarRouter: RouterInterface = Object.create(CalendarRouter);
  calendarRouter.init(calendarsRepository);
  return calendarRouter.getRouter();
}

export { createCalendarRouter };
