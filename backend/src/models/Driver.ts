import { DataTypes, Model, Sequelize } from 'sequelize';

class Driver extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public vehicle!: string;
  public rating!: number;
  public pricePerKm!: number;

  static initModel(sequelize: Sequelize) {
    Driver.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      vehicle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      pricePerKm: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Driver',
      tableName: 'drivers',
    });
  }
}

export default Driver;