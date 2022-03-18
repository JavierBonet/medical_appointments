import {
  Association,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import Appointment from './appointment';
import Calendar from './calendar';
import Doctor from './doctor';
import { sequelize } from './index';

/**
 * PASOS PARA INCLUIR TYPESCRIPT EN MODELOS
 *
 * 1. Dentro de la clase declarar:
 *  1. Atributos del modelo. Usar CreationOptional para atributos que sean opcionales al momento de actualizar
 *  2. Tipos de funciones de asociaciones
 *  3. Tipo de las asociaciones
 * 2. En el método init de la clase, definir la configuración de cada atributo, incluyendo a id
 * 3. Asociaciones del modelo
 */

export type CreationAttributes = InferAttributes<
  Hospital,
  { omit: 'id' | 'createdAt' | 'updatedAt' }
>;
export type Attributes = InferAttributes<Hospital>;

class Hospital extends Model<
  InferAttributes<Hospital>,
  InferCreationAttributes<Hospital>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare address: string;
  declare phone: string;
  declare zip_code: number;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  declare getAppointments: HasManyGetAssociationsMixin<Appointment>;
  declare getDoctors: BelongsToManyGetAssociationsMixin<Doctor>;
  declare addDoctor: BelongsToManyAddAssociationMixin<Doctor, number>;
  declare addDoctors: BelongsToManyAddAssociationsMixin<Doctor, number>;

  declare static associations: {
    appointments: Association<Hospital, Appointment>;
    doctors: Association<Hospital, Doctor>;
  };
}
Hospital.init(
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    zip_code: {
      type: DataTypes.INTEGER,
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
    modelName: 'Hospital',
  }
);

Hospital.hasMany(Appointment, { foreignKey: 'hospitalId' });
Appointment.belongsTo(Hospital, { foreignKey: 'hospitalId' });
Hospital.hasMany(Calendar, { foreignKey: 'hospitalId' });
Calendar.belongsTo(Hospital, { foreignKey: 'hospitalId' });

Hospital.belongsToMany(Doctor, { through: 'DoctorHospitals' });
Doctor.belongsToMany(Hospital, { through: 'DoctorHospitals' });

export default Hospital;
