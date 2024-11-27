import { Sequelize } from 'sequelize';
import User from './User';
import Driver from './Driver';
import Ride from './Ride';

// Função para inicializar todos os modelos e configurar associações
export const initModels = (sequelize: Sequelize) => {
  // Inicialização dos modelos
  User.initModel(sequelize);
  Driver.initModel(sequelize);
  Ride.initModel(sequelize);

  // Configuração das associações
  User.hasMany(Ride, { foreignKey: 'userId', as: 'rides' });
  Driver.hasMany(Ride, { foreignKey: 'driverId', as: 'rides' });
  Ride.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  Ride.belongsTo(Driver, { foreignKey: 'driverId', as: 'driver' });
};

// Exporta os modelos para uso em outras partes da aplicação
export { User, Driver, Ride };