import { Sequelize } from 'sequelize';
import { initModels, Ride } from '../models/index';
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

const seedRides = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully for seeding rides.');

    initModels(sequelize);

    const rides = [
      {
        origin: 'Point A',
        destination: 'Point B',
        distance: 10.5,
        duration: '15 minutes',
        price: 15.75,
        customerId: '1',
        driverId: 1,
      },
      {
        origin: 'Point C',
        destination: 'Point D',
        distance: 8.2,
        duration: '12 minutes',
        price: 12.30,
        customerId: '2',
        driverId: 2,
      },
    ];

    await Ride.bulkCreate(rides);
    console.log('Rides added successfully!');
  } catch (error) {
    console.error('Error seeding rides:', error instanceof Error ? error.message : error);
  } finally {
    await sequelize.close();
    process.exit();
  }
};

seedRides();
