import { Sequelize } from 'sequelize';
import User from './User';
import Driver from './Driver';
import Ride from './Ride';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'taxi_app',
  process.env.DB_USER || 'root',    
  process.env.DB_PASSWORD || 'root', 
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306, 
    dialect: 'mysql', 
  }
);

const registerModels = () => {
  User.initModel(sequelize);
  Driver.initModel(sequelize);
  Ride.initModel(sequelize);
};

const syncDatabase = async () => {
  try {
    registerModels();
    await sequelize.sync({ alter: true });
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