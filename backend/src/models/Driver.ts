import { DataTypes, Model, Sequelize } from 'sequelize';

class Driver extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public vehicle!: string;
  public review!: { rating: number; comment: string };
  public value!: number;

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
      review: {
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
          isValidReview(value: any) {
            if (value && (!value.rating || !value.comment)) {
              throw new Error('Review must include both rating and comment');
            }
          },
        },
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Driver',
      tableName: 'drivers',
      timestamps: true, // Ativa o rastreamento de criação/atualização
    });
  }
}

export default Driver;