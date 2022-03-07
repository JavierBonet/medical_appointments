import { sequelize } from './index';
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  BelongsToGetAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationsMixin,
  Association,
} from 'sequelize';
import Hospital from './hospital';
import Doctor from './doctor';
import Day from './day';
class Calendar extends Model<
  InferAttributes<Calendar>,
  InferCreationAttributes<Calendar>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare doctorId: number;
  declare hospitalId: number;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  declare getHospital: BelongsToGetAssociationMixin<Hospital>;
  declare getDoctor: BelongsToGetAssociationMixin<Doctor>;
  declare getDays: HasManyGetAssociationsMixin<Day>;
  declare addDays: HasManyAddAssociationsMixin<Day, number>;

  declare static associations: {
    hospital: Association<Calendar, Hospital>;
    doctor: Association<Calendar, Doctor>;
    days: Association<Calendar, Day>;
  };
}
Calendar.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
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
    modelName: 'Calendar',
  }
);

Calendar.hasMany(Day, { foreignKey: 'calendarId' });
Day.belongsTo(Calendar, { foreignKey: 'calendarId' });

export default Calendar;
