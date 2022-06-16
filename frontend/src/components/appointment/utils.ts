function getHospitalOptions(hospitals: Hospital[]): SelectOption[] {
  let options: SelectOption[] = [];

  hospitals.forEach((hospital) => {
    options.push({ key: hospital.id, value: hospital.id, text: hospital.name });
  });

  return options;
}

function getDoctorOptions(doctors: Doctor[]): SelectOption[] {
  let options: SelectOption[] = [];

  doctors.forEach((doctor) => {
    options.push({ key: doctor.id, value: doctor.id, text: doctor.name });
  });

  return options;
}

export { getHospitalOptions, getDoctorOptions };
