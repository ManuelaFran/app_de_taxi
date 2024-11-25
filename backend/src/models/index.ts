import { Sequelize } from 'sequelize';
import User from './User';
import Driver from './Driver';
import Ride from './Ride';

const sequelize = new Sequelize('taxi_app', 'root', 'root', {
  host: 'db',
  dialect: 'mysql',
});

const registerModels = () => {
  User.initModel(sequelize);
  Driver.initModel(sequelize);
  Ride.initModel(sequelize);
};

const syncDatabase = async () => {
  try {
    registerModels();
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'Unknown error occurred');
  }
};

// Testando a conexão
const testConnection = async () => {
  let attempts = 5;
  while (attempts > 0) {
    try {
      await sequelize.authenticate();
      return;
    } catch (error) {
      attempts--;
      console.log(`Retrying... (${5 - attempts}/5)`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  console.error('Failed to connect to the database after 5 attempts');
};

// Iniciar sincronização e conexão
testConnection().then(syncDatabase);

export default sequelize;