import { DoctorRepositoryInterface } from '../../repositories/doctor';

class HospitalAssociationsService {
  private _doctorsRepository: DoctorRepositoryInterface;

  constructor(doctorsRepository: DoctorRepositoryInterface) {
    this._doctorsRepository = doctorsRepository;
  }

  create(hospitalId: number, doctorId: number) {
    return this._doctorsRepository.addHospitalAssociation(hospitalId, doctorId);
  }

  update(previousHospitalId: number, hospitalId: number, doctorId: number) {
    return this._doctorsRepository.replaceHospitalAssociation(
      previousHospitalId,
      hospitalId,
      doctorId
    );
  }
}

export { HospitalAssociationsService };
