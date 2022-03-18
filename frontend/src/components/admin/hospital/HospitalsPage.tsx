import React, { useState, useEffect } from 'react';
import HospitalsList from './HospitalsList';

const HospitalsPage = () => {
  const [hospitals, setHospitals] = useState([
    { name: 'asd', address: 'asafswef', phone: '2131634712', zip_code: 2000 },
  ] as Hospital[]);

  // useEffect(() => {
  //   if (hospitals.length == 0) {
  //     // Obtener los hospitales por medio de la api
  //   }
  // }, [hospitals]);

  return (
    <div className="section-container">
      <h1>Hospitals</h1>
      <HospitalsList hospitals={hospitals} />
      {/* Botón para crear hospital */}
    </div>
  );
};

/**
 * Acá tengo que guardar info sobre los hospitales,
 * mostrar la lista de hospitales y tener un botón
 * que lleve a una vista para crear un hospital
 */

export default HospitalsPage;
