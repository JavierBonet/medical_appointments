import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  BelongsToGetAssociationMixin,
  CreationOptional,
  Association,
} from 'sequelize';
import Doctor from './doctor';
import Hospital from './hospital';
import { sequelize } from './index';

export type CreationAttributes = InferAttributes<
  Appointment,
  { omit: 'id' | 'createdAt' | 'updatedAt' }
>;
export type Attributes = InferAttributes<Appointment>;

class Appointment extends Model<
  InferAttributes<Appointment>,
  InferCreationAttributes<Appointment>
> {
  declare id: CreationOptional<number>;
  declare date: Date;
  declare hour: string;
  declare dayOfTheWeek: string;
  declare doctorId: number;
  declare hospitalId: number;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  declare getHospital: BelongsToGetAssociationMixin<Hospital>;
  declare getDoctor: BelongsToGetAssociationMixin<Doctor>;

  declare static associations: {
    hospital: Association<Appointment, Hospital>;
    doctor: Association<Appointment, Doctor>;
  };
}
Appointment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    hour: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    dayOfTheWeek: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    doctorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    hospitalId: {
      type: DataTypes.INTEGER.UNSIGNED,
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
    modelName: 'Appointment',
  }
);

export default Appointment;
