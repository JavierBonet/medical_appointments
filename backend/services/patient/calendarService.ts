import { CalendarRepositoryInterface } from '../../repositories/calendar';

class CalendarService {
  private _calendarsRepository: CalendarRepositoryInterface;

  constructor(calendarsRepository: CalendarRepositoryInterface) {
    this._calendarsRepository = calendarsRepository;
  }

  getCalendarByDoctorAndHospitalId(doctorId: number, hospitalId: number) {
    return this._calendarsRepository.getCalendarByDoctorAndHospitalId(
      doctorId,
      hospitalId
    );
  }
}

export { CalendarService };
