import { sequelize } from './index';
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToGetAssociationMixin,
  HasManyGetAssociationsMixin,
  Association,
} from 'sequelize';
import Calendar from './calendar';
import HourRange from './hourrange';

export type CreationAttributes = InferAttributes<
  Day,
  { omit: 'id' | 'createdAt' | 'updatedAt' }
>;
export type Attributes = InferAttributes<Day>;

class Day extends Model<InferAttributes<Day>, InferCreationAttributes<Day>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare number: number;
  declare calendarId: number;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  declare getCalendar: BelongsToGetAssociationMixin<Calendar>;
  declare getHourRanges: HasManyGetAssociationsMixin<HourRange>;

  declare static associations: {
    calendar: Association<Day, Calendar>;
    hourRanges: Association<Day, HourRange>;
  };
}
Day.init(
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
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    calendarId: {
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
    modelName: 'Day',
  }
);

Day.hasMany(HourRange, { foreignKey: 'dayId' });
HourRange.belongsTo(Day, { foreignKey: 'dayId' });

export default Day;
