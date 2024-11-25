import { DataTypes, Model, Sequelize } from 'sequelize';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;

  static initModel(sequelize: Sequelize) {
    User.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    });
  }
}

export default User;