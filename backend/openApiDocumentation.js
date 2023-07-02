module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'Medical appointments',
    description: 'Medical appointments API',
    termsOfService: 'http://api_url/terms/',
    contact: {
      name: 'Bonet Javier',
      email: 'javbonet@gmail.com',
      url: 'https://github.com/JavierBonet',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Local server',
    },
  ],
  components: {
    schemas: {
      identificationNumber: {
        type: 'integer',
        description: 'User identification number',
        example: 1234,
      },
      username: {
        type: 'string',
        example: 'raparicio',
      },
      companyId: {
        type: 'integer',
        description: 'Company id where the user works',
        example: 15,
      },
      DbDoctor: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/identificationNumber',
          },
          name: {
            type: 'string',
          },
          surname: {
            type: 'string',
          },
          age: {
            type: 'integer',
            required: false,
          },
          speciality: {
            type: 'string',
          },
          Calendars: {
            $ref: '#/components/schemas/DbCalendars',
          },
        },
      },
      DbDoctors: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/DbDoctor',
        },
      },
      DbCalendar: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/identificationNumber',
          },
          name: {
            type: 'string',
          },
          doctorId: {
            $ref: '#/components/schemas/identificationNumber',
          },
          hospitalId: {
            $ref: '#/components/schemas/identificationNumber',
          },
          Doctor: {
            $ref: '#/components/schemas/DbDoctor',
          },
          Hospital: {
            $ref: '#/components/schemas/DbHospital',
          },
          Days: {
            $ref: '#/components/schemas/DbDays',
          },
        },
      },
      DbCalendars: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/DbCalendar',
        },
      },
      DbHospital: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/identificationNumber',
          },
          name: {
            type: 'string',
          },
          address: {
            type: 'string',
          },
          phone: {
            type: 'string',
          },
          zip_code: {
            type: 'integer',
          },
          Doctors: {
            $ref: '#/components/schemas/DbDoctors',
            required: false,
          },
        },
      },
      DbHospitals: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/DbHospital',
        },
      },
      DbDay: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/identificationNumber',
          },
          number: {
            type: 'integer',
          },
          calendarId: {
            $ref: '#/components/schemas/identificationNumber',
          },
          HourRanges: {
            $ref: '#/components/schemas/DbHourRanges',
          },
        },
      },
      DbDays: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/DbDay',
        },
      },
      DbHourRange: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/identificationNumber',
          },
          start: {
            type: 'string',
          },
          end: {
            type: 'string',
          },
          dayId: {
            $ref: '#/components/schemas/identificationNumber',
          },
        },
      },
      DbHourRanges: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/DbHourRange',
        },
      },
      DbAppointment: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/identificationNumber',
          },
          date: { type: 'string' },
          hour: { type: 'string' },
          dayOfTheWeek: { type: 'string' },
          doctorId: {
            $ref: '#/components/schemas/identificationNumber',
          },
          hospitalId: {
            $ref: '#/components/schemas/identificationNumber',
          },
          patientId: {
            $ref: '#/components/schemas/identificationNumber',
            required: false,
          },
          Doctor: {
            $ref: '#/components/schemas/DbDoctor',
          },
          Hospital: {
            $ref: '#/components/schemas/DbHospital',
          },
        },
      },
      DbAppointments: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/DbAppointment',
        },
      },
      Doctor: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          surname: {
            type: 'string',
          },
          age: {
            type: 'integer',
            required: false,
          },
          speciality: {
            type: 'string',
          },
          Calendars: {
            $ref: '#/components/schemas/Calendars',
            required: false,
          },
        },
      },
      Doctors: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Doctor',
        },
      },
      Calendar: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          doctorId: {
            $ref: '#/components/schemas/identificationNumber',
          },
          hospitalId: {
            $ref: '#/components/schemas/identificationNumber',
          },
        },
      },
      Calendars: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Calendar',
        },
      },
      Hospital: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          address: {
            type: 'string',
          },
          phone: {
            type: 'string',
          },
          zip_code: {
            type: 'integer',
          },
          Doctors: {
            $ref: '#/components/schemas/Doctors',
            required: false,
          },
        },
      },
      Hospitals: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Hospital',
        },
      },
      Day: {
        type: 'object',
        properties: {
          number: {
            type: 'integer',
          },
          calendarId: {
            $ref: '#/components/schemas/identificationNumber',
          },
          HourRanges: {
            $ref: '#/components/schemas/HourRanges',
            required: false,
          },
        },
      },
      Days: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Day',
        },
      },
      HourRange: {
        type: 'object',
        properties: {
          start: {
            type: 'string',
          },
          end: {
            type: 'string',
          },
          dayId: {
            $ref: '#/components/schemas/identificationNumber',
          },
        },
      },
      HourRanges: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/HourRange',
        },
      },
      Appointment: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/identificationNumber',
            required: false,
          },
          date: { type: 'string' },
          hour: { type: 'string' },
          dayOfTheWeek: { type: 'string' },
          doctorId: {
            $ref: '#/components/schemas/identificationNumber',
          },
          hospitalId: {
            $ref: '#/components/schemas/identificationNumber',
          },
          patientId: {
            $ref: '#/components/schemas/identificationNumber',
            required: false,
          },
        },
      },
      Appointments: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Appointment',
        },
      },
      PatientAppointment: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/components/schemas/identificationNumber',
          },
          date: { type: 'string' },
          hour: { type: 'string' },
          dayOfTheWeek: { type: 'string' },
          doctorId: {
            $ref: '#/components/schemas/identificationNumber',
          },
          hospitalId: {
            $ref: '#/components/schemas/identificationNumber',
          },
          patientId: {
            $ref: '#/components/schemas/identificationNumber',
          },
        },
      },
      PatientAppointments: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/PatientAppointment',
        },
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          internal_code: {
            type: 'string',
          },
        },
      },
    },
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'connect.sid',
      },
    },
  },
  security: [
    {
      cookieAuth: [],
    },
  ],
  tags: [
    {
      name: 'Admin doctors',
    },
    {
      name: 'Admin doctor calendars',
    },
    {
      name: 'Admin doctor associated hospitals',
    },
    {
      name: 'Admin hospitals',
    },
    {
      name: 'Patient doctors',
    },
    {
      name: 'Patient hospitals',
    },
    {
      name: 'Patient appointments',
    },
    {
      name: 'Patient calendar',
    },
    {
      name: 'Patient authentication',
    },
  ],
  paths: {
    '/api/admin/doctors': {
      get: {
        tags: ['Admin doctors'],
        description: 'Get doctors',
        operationId: 'getDoctors',
        responses: {
          200: {
            description: 'Doctors were obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbDoctors',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Admin doctors'],
        description: 'Create doctor',
        operationId: 'postDoctor',
        requestBody: {
          description: 'Data needed to create a doctor',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Doctor',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Doctor was created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbDoctor',
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'companyId is missing',
                  internal_code: 'missing_parameters',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
    },
    '/api/admin/doctors/{doctorId}': {
      get: {
        tags: ['Admin doctors'],
        description: 'Get doctor by ID',
        operationId: 'getDoctor',
        parameters: [
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Doctor was obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbDoctor',
                },
              },
            },
          },
          404: {
            description: 'Doctor not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'doctor not found',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Admin doctors'],
        description: 'Update doctor',
        operationId: 'putDoctor',
        parameters: [
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        requestBody: {
          description: 'Data needed to update a doctor',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DbDoctor',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Doctor was updated',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbDoctor',
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'companyId is missing',
                  internal_code: 'missing_parameters',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Admin doctors'],
        description: 'Delete doctor',
        operationId: 'deleteDoctor',
        parameters: [
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Doctor was deleted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                  },
                },
                example: {
                  message: 'Doctor deleted successfully',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
    },
    '/api/admin/doctors/{doctorId}/calendars': {
      get: {
        tags: ['Admin doctor calendars'],
        description: "Get a doctor's calendars",
        operationId: 'getDoctorCalendars',
        parameters: [
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Calendars were obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbCalendars',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Admin doctor calendars'],
        description: "Create a doctor's calendar",
        operationId: 'postDoctorCalendar',
        parameters: [
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        requestBody: {
          description: 'Data needed to create a calendar',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Calendar',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Calendar was created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbCalendar',
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'companyId is missing',
                  internal_code: 'missing_parameters',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
    },
    '/api/admin/doctors/{doctorId}/calendars/{calendarId}': {
      get: {
        tags: ['Admin doctor calendars'],
        description: "Get doctor's calendar by ID",
        operationId: 'getDoctorCalendar',
        parameters: [
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'calendarId',
            description: 'Calendar ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Calendar was obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbCalendar',
                },
              },
            },
          },
          404: {
            description: 'Calendar not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'doctor not found',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Admin doctor calendars'],
        description: "Update doctor's calendar",
        operationId: 'putDoctorCalendar',
        parameters: [
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'calendarId',
            description: 'Calendar ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        requestBody: {
          description: 'Data needed to update a calendar',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DbCalendar',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Calendar was updated',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbCalendar',
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'companyId is missing',
                  internal_code: 'missing_parameters',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Admin doctor calendars'],
        description: "Delete doctor's calendar",
        operationId: 'deleteDoctorCalendar',
        parameters: [
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'calendarId',
            description: 'Calendar ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Calendar was deleted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                  },
                },
                example: {
                  message: 'Calendar deleted successfully',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
    },
    '/api/admin/doctors/{doctorId}/calendars/{calendarId}/days': {
      get: {
        tags: ['Admin doctor calendars'],
        description: "Get calendar's days",
        operationId: 'getCalendarDays',
        parameters: [
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'calendarId',
            description: 'Calendar ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Days were obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbDays',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Admin doctor calendars'],
        description: 'Create a calendar day',
        operationId: 'postCalendarDay',
        parameters: [
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'calendarId',
            description: 'Calendar ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        requestBody: {
          description: 'Data needed to create a day',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Day',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Day was created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbDay',
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'companyId is missing',
                  internal_code: 'missing_parameters',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
    },
    '/api/admin/doctors/{doctorId}/calendars/{calendarId}/days/{dayId}': {
      get: {
        tags: ['Admin doctor calendars'],
        description: "Get calendar's day by ID",
        operationId: 'getCalendarDay',
        parameters: [
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'calendarId',
            description: 'Calendar ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'dayId',
            description: 'Day ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Day was obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbDay',
                },
              },
            },
          },
          404: {
            description: 'Calendar not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'doctor not found',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Admin doctor calendars'],
        description: 'Update a calendar day',
        operationId: 'putCalendarDay',
        parameters: [
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'calendarId',
            description: 'Calendar ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'dayId',
            description: 'Day ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        requestBody: {
          description: 'Data needed to update a day',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DbDay',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Day was updated',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbDay',
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'companyId is missing',
                  internal_code: 'missing_parameters',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Admin doctor calendars'],
        description: 'Delete a calendar day',
        operationId: 'deleteCalendarDay',
        parameters: [
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'calendarId',
            description: 'Calendar ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'dayId',
            description: 'Day ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Day was deleted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                  },
                },
                example: {
                  message: 'Day deleted successfully',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
    },
    '/api/admin/doctors/{doctorId}/calendars/{calendarId}/days/{dayId}/hourRanges': {
      post: {
        tags: ['Admin doctor calendars'],
        description: 'Create a day hour range',
        operationId: 'postDayHourRange',
        parameters: [
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'calendarId',
            description: 'Calendar ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'dayId',
            description: 'Day ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        requestBody: {
          description: 'Data needed to create an hour range',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/HourRange',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Hour range was created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbHourRange',
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'companyId is missing',
                  internal_code: 'missing_parameters',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
    },
    '/api/admin/doctors/{doctorId}/calendars/{calendarId}/days/{dayId}/hourRanges/{hourRangeId}': {
      put: {
        tags: ['Admin doctor calendars'],
        description: 'Update a day hour range',
        operationId: 'putDayHourRange',
        parameters: [
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'calendarId',
            description: 'Calendar ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'dayId',
            description: 'Day ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'hourRangeId',
            description: 'Hour range ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        requestBody: {
          description: 'Data needed to update an hour range',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DbHourRange',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Hour range was updated',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbHourRange',
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'companyId is missing',
                  internal_code: 'missing_parameters',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Admin doctor calendars'],
        description: 'Delete a day hour range',
        operationId: 'deleteDayHourRange',
        parameters: [
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'calendarId',
            description: 'Calendar ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'dayId',
            description: 'Day ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'hourRangeId',
            description: 'Hour range ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Hour range was deleted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                  },
                },
                example: {
                  message: 'Hour range deleted successfully',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
    },
    '/api/admin/doctors/{doctorId}/associations/hospitals/{hospitalId}': {
      post: {
        tags: ['Admin doctor associated hospitals'],
        description: 'Create association between a doctor and a hospital',
        operationId: 'postDoctorHospitalAssociation',
        parameters: [
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'hospitalId',
            description: 'Hospital ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        responses: {
          201: {
            description: 'Association was created',
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'companyId is missing',
                  internal_code: 'missing_parameters',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
    },
    '/api/admin/doctors/{doctorId}/associations/hospitals/{previousHospitalId}/{hospitalId}': {
      put: {
        tags: ['Admin doctor associated hospitals'],
        description: 'Replace doctor and hospital association',
        operationId: 'putDoctor',
        parameters: [
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'previousHospitalId',
            description: 'Hospital ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'hospitalId',
            description: 'Hospital ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Association was updated',
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'companyId is missing',
                  internal_code: 'missing_parameters',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
    },
    '/api/admin/hospitals': {
      get: {
        tags: ['Admin hospitals'],
        description: 'Get hospitals',
        operationId: 'getHospitals',
        responses: {
          200: {
            description: 'Hospitals were obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbHospitals',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Admin hospitals'],
        description: 'Create hospital',
        operationId: 'postHospital',
        requestBody: {
          description: 'Data needed to create a hospital',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Hospital',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Hospital was created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbHospital',
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'companyId is missing',
                  internal_code: 'missing_parameters',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
    },
    '/api/admin/hospitals/{hospitalId}': {
      get: {
        tags: ['Admin hospitals'],
        description: 'Get hospital by ID',
        operationId: 'getHospital',
        parameters: [
          {
            name: 'hospitalId',
            description: 'Hospital ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Hospital was obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbHospital',
                },
              },
            },
          },
          404: {
            description: 'Hospital not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'hospital not found',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Admin hospitals'],
        description: 'Update hospital',
        operationId: 'putHospital',
        parameters: [
          {
            name: 'hospitalId',
            description: 'Hospital ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        requestBody: {
          description: 'Data needed to update a hospital',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DbHospital',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Hospital was updated',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbHospital',
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'companyId is missing',
                  internal_code: 'missing_parameters',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Admin hospitals'],
        description: 'Delete hospital',
        operationId: 'deleteHospital',
        parameters: [
          {
            name: 'hospitalId',
            description: 'Hospital ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Hospital was deleted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                  },
                },
                example: {
                  message: 'Hospital deleted successfully',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/admin/login.',
                },
              },
            },
          },
        },
      },
    },
    '/api/patients/doctors': {
      get: {
        tags: ['Patient doctors'],
        description: 'Get doctors',
        operationId: 'getDoctors',
        responses: {
          200: {
            description: 'Doctors were obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbDoctors',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/patient/login.',
                },
              },
            },
          },
        },
      },
    },
    '/api/patients/hospitals': {
      get: {
        tags: ['Patient hospitals'],
        description: 'Get hospitals',
        operationId: 'getHospitals',
        responses: {
          200: {
            description: 'Hospitals were obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbHospitals',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/patient/login.',
                },
              },
            },
          },
        },
      },
    },
    '/api/patients/appointments': {
      get: {
        tags: ['Patient appointments'],
        description: 'Get appointments',
        operationId: 'getAppointments',
        responses: {
          200: {
            description: 'Appointments were obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbAppointments',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/patient/login.',
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Patient appointments'],
        description: 'Create appointment',
        operationId: 'postAppointment',
        requestBody: {
          description: 'Data needed to create an appointment',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Appointment',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Doctor was created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbAppointment',
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'companyId is missing',
                  internal_code: 'missing_parameters',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/patient/login.',
                },
              },
            },
          },
        },
      },
    },
    '/api/patients/appointments/{hospitalId}/{doctorId}': {
      get: {
        tags: ['Patient appointments'],
        description: 'Get appointments for an specific hospital and doctor',
        operationId: 'getAppointmentsForSpecificHospitalAndDoctor',
        parameters: [
          {
            name: 'hospitalId',
            description: 'Hospital ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Appointments were obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PatientAppointments',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/patient/login.',
                },
              },
            },
          },
        },
      },
    },
    '/api/patients/appointments/{appointmentId}': {
      get: {
        tags: ['Patient appointments'],
        description: 'Get appointment by ID',
        operationId: 'getAppointment',
        parameters: [
          {
            name: 'appointmentId',
            description: 'Appointment ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Appointment was obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PatientAppointment',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/patient/login.',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Patient appointments'],
        description: 'Update appointment',
        operationId: 'updateAppointment',
        parameters: [
          {
            name: 'appointmentId',
            description: 'Appointment ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        requestBody: {
          description: 'Data needed to update an appointment',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PatientAppointment',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Appointment updated',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PatientAppointment',
                },
              },
            },
          },
          400: {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'companyId is missing',
                  internal_code: 'missing_parameters',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/patient/login.',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Patient appointments'],
        description: 'Delete appointment by ID',
        operationId: 'deleteAppointment',
        parameters: [
          {
            name: 'appointmentId',
            description: 'Appointment ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Appointment deleted',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                  },
                },
                example: {
                  message: 'Appointment deleted successfully',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/patient/login.',
                },
              },
            },
          },
        },
      },
    },
    '/api/patients/calendar/{hospitalId}/{doctorId}': {
      get: {
        tags: ['Patient calendar'],
        description: 'Get calendar for an specific hospital and doctor',
        operationId: 'getCalendarForSpecificHospitalAndDoctor',
        parameters: [
          {
            name: 'hospitalId',
            description: 'Hospital ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
          {
            name: 'doctorId',
            description: 'Doctor ID',
            in: 'path',
            schema: {
              $ref: '#/components/schemas/identificationNumber',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Calendar was obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/DbCalendar',
                },
              },
            },
          },
          404: {
            description: 'Calendar not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'calendar not found',
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Please login using email and password. Login endpoint: /api/patient/login.',
                },
              },
            },
          },
        },
      },
    },
  },
};
