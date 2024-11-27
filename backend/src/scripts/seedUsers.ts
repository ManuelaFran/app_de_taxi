import { Sequelize } from 'sequelize';
import { initModels, User } from '../models/index';
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
    logging: false,
  }
);

const seedUsers = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully for seeding users.');

    initModels(sequelize);

    const users = [
      { name: 'Alice Johnson', email: 'alice@example.com' },
      { name: 'Bob Brown', email: 'bob@example.com' },
    ];

    await User.bulkCreate(users);
    console.log('Users added successfully!');
  } catch (error) {
    console.error('Error seeding users:', error instanceof Error ? error.message : error);
  } finally {
    await sequelize.close();
    process.exit();
  }
};

seedUsers();
