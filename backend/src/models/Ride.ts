import { DataTypes, Model, Sequelize } from 'sequelize';

class Ride extends Model {
  public id!: number;
  public origin!: string;
  public destination!: string;
  public distance!: number;
  public duration!: string;
  public price!: number;
  public customerId!: string;
  public driverId!: number;

  static initModel(sequelize: Sequelize) {
    Ride.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      distance: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      customerId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      driverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Ride',
      tableName: 'rides',
      timestamps: true, // Ativa o rastreamento de criação/atualização
    });
  }
}

export default Ride;