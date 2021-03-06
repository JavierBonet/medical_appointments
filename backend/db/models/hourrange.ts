import { sequelize } from './index';
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToGetAssociationMixin,
  Association,
} from 'sequelize';
import Day from './day';

export type CreationAttributes = InferAttributes<
  HourRange,
  { omit: 'id' | 'createdAt' | 'updatedAt' }
>;
export type Attributes = InferAttributes<HourRange>;

class HourRange extends Model<
  InferAttributes<HourRange>,
  InferCreationAttributes<HourRange>
> {
  declare id: CreationOptional<number>;
  declare start: string;
  declare end: string;
  declare dayId: number;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  declare getDay: BelongsToGetAssociationMixin<Day>;

  declare static associations: {
    day: Association<HourRange, Day>;
  };
}
HourRange.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    start: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    end: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    dayId: {
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
    modelName: 'HourRange',
  }
);

export default HourRange;
