import React, { useState, useEffect, ReactElement } from 'react';
import {
  useParams,
  useNavigate,
  Outlet,
  BrowserRouter,
  Routes,
  Route,
  MemoryRouter,
} from 'react-router-dom';
// import { getDoctor, saveDoctor } from '../../../api/admin/doctors';
// import { toast } from 'react-toastify';
import CalendarsPage from '../calendar/CalendarsPage';
import DoctorPage from '../DoctorPage';
import { render as rendertl, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// function render(ui: ReactElement, value = {}, ...options: any[]) {
//   function Wrapper() {
//     return (
//       <BrowserRouter>
//         <Routes>
//           <Route
//             path="doctor/:doctorId"
//             element={<DoctorPage logout={jest.fn()} />}
//           >
//             <Route index element={<CalendarsPage />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     );
//   }
//   return rendertl(ui, { wrapper: Wrapper, ...options });
// }

function render(ui: ReactElement, value = {}, ...options: any[]) {
  function Wrapper() {
    return (
      <MemoryRouter initialEntries={['doctor/1']}>
        <Routes>
          <Route path="doctor/:doctorId"></Route>
        </Routes>
      </MemoryRouter>
    );
  }
  return rendertl(ui, { wrapper: Wrapper, ...options });
}

const renderWithRouter = (children: JSX.Element) =>
  rendertl(
    <MemoryRouter initialEntries={['/admin/doctor/1']}>
      <Routes>
        <Route
          path="/admin/doctor/:doctorId"
          element={<DoctorPage logout={jest.fn()} />}
        >
          {children}
        </Route>
      </Routes>
    </MemoryRouter>
  );

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
  Outlet: jest.fn(),
}));
const mockedUseParams = jest.mocked(useParams);
// let mockedUseNavigate = jest.mocked(useNavigate);
const mockedOutlet = jest.mocked(Outlet);

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useParams,
//   useNavigate,
// }));
// jest.mock('react-router-dom');

// const mockedUsedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...(jest.requireActual('react-router-dom') as any),
//   useNavigate: () => mockedUsedNavigate,
// }));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useEffect: jest.fn(),
}));
const mockedUseState = jest.mocked(useState);
// const mockedUseEffect = jest.mocked(useEffect);

// mockedUseNavigate = jest.fn();

// MOCKEAR LAS COSAS DE react-router-dom ASÍ, NO ME DEJA MODIFICARLOS DESPUÉS
// Y SI LO HAGO DIRECTAMENTE CON jest.mock('react-router-dom');, NO TOMA A
// Outlet COMO ALGO QUE EXISTA Y TIRA LO DEL TypeError: Cannot set properties of undefined (setting 'displayName')
// ASÍ QUE TENGO QUE ENCONTRAR LA FORMA DE MOCKEAR SIN ESPECIFICAR TODAS LAS COSAS DENTRO DEL jest.mock(......)
// Y QUE ENCUENTRE A Outlet

jest.mock('../calendar/CalendarsPage', () => () => <div>Calendars</div>);

jest.mock('../../../commons/CustomLoader', () => () => <div>Loading</div>);

jest.mock('../DoctorForm', () => () => <div>Doctor form</div>);

const initialDoctor: OptionalDoctor = {
  name: '',
  surname: '',
  age: 0,
  speciality: '',
  Calendars: [],
};

const doctorStateFn = jest.fn();
const loadingStateFn = jest.fn();

describe('DoctorPage', () => {
  describe('when loading is true', () => {
    it('should show the calendar and the loader', async () => {
      mockedUseParams.mockReturnValue({ doctorId: '1', calendarId: '123' });
      mockedUseState
        .mockReturnValueOnce([initialDoctor, doctorStateFn])
        .mockReturnValueOnce([false, loadingStateFn]);
      mockedOutlet.mockReturnValue(<CalendarsPage />);
      // mockedUseNavigate.mockImplementation(jest.fn());

      rendertl(<DoctorPage logout={jest.fn()} />);

      // VER DIRERENCIA ENTRE findByText Y  getByText
      //
      //ADEMAS, VER CÓMO CONFIGURAR DE MANERA BÁSICA EL ARCHIVO jest.config.js
      // let calendars = await screen.findByText(/Calendars/i);
      let calendars = screen.getByText(/Calendars/i);

      expect(calendars).toBeInTheDocument();
    });
  });
});

// const initialDoctor: OptionalDoctor = {
//   name: '',
//   surname: '',
//   age: 0,
//   speciality: '',
//   Calendars: [],
// };

// interface PropsInterface {
//   logout: () => void;
// }

// const DoctorPage = ({ logout }: PropsInterface) => {
//   const [doctor, setDoctor] = useState(initialDoctor);
//   const [loading, setLoading] = useState(false);
//   const params = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const doctorId = params.doctorId;

//     if (doctorId) {
//       setLoading(true);
//       getDoctor(doctorId)
//         .then((doctor) => {
//           setLoading(false);
//           setDoctor(doctor);
//         })
//         .catch((error) => {
//           setLoading(false);
//           if (error === 401) {
//             logout();
//             navigate('/admin/signin');
//             toast.warning('Please log in');
//           } else {
//             navigate('../doctors');
//             toast.warning(error);
//           }
//         });
//     }
//   }, []);

//   function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
//     const { name, value } = event.target;
//     let newDoctor = { ...doctor, [name]: value };
//     setDoctor(newDoctor);
//   }

//   function saveHandler() {
//     saveDoctor(doctor)
//       .then((message) => {
//         navigate('../doctors');
//         toast.success(message);
//       })
//       .catch((errorMessage) => toast.error(errorMessage));
//   }

//   return (
//     <div className="section-container">
//       {params.calendarId ? (
//         <Outlet />
//       ) : loading ? (
//         <>
//           <h1>Loading...</h1>
//           <CustomLoader loading={loading} />
//         </>
//       ) : (
//         <div className="two-columns">
//           <div className="first-column">
//             <h1>
//               {doctor.name ? `${doctor.name} ${doctor.surname}` : 'New doctor'}
//             </h1>
//             <DoctorForm
//               doctor={doctor}
//               changeHandler={changeHandler}
//               saveHandler={saveHandler}
//             />
//           </div>
//           {doctor.id && (
//             <div className="second-column">
//               <Outlet />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorPage;
