import { sequelize } from './index';
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Association,
  HasManyGetAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
} from 'sequelize';
import Hospital from './hospital';
import Appointment from './appointment';
import Calendar from './calendar';

class Doctor extends Model<
  InferAttributes<Doctor>,
  InferCreationAttributes<Doctor>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare surname: string;
  declare age?: number;
  declare speciality: string;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  declare getAppointments: HasManyGetAssociationsMixin<Appointment>;
  declare getHospitals: BelongsToManyGetAssociationsMixin<Hospital>;

  declare static associations: {
    appointments: Association<Appointment, Doctor>;
    hospitals: Association<Hospital, Doctor>;
  };
}
Doctor.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    age: DataTypes.NUMBER,
    speciality: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Doctor',
  }
);

Doctor.hasMany(Appointment, { foreignKey: 'doctorId' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });
Doctor.hasMany(Calendar, { foreignKey: 'doctorId' });
Calendar.belongsTo(Doctor, { foreignKey: 'doctorId' });

Doctor.belongsToMany(Hospital, { through: 'DoctorHospitals' });

export default Doctor;
