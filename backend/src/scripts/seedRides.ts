import sequelize from '../models/index';
import Ride from '../models/Ride';

const seedRides = async () => {
  try {
    await sequelize.authenticate();

    const rides = [
      {
        origin: 'Point A',
        destination: 'Point B',
        distance: 10.5,
        duration: '15 minutes',
        price: 15.75,
        userId: 1,
        driverId: 1,
      },
      {
        origin: 'Point C',
        destination: 'Point D',
        distance: 8.2,
        duration: '12 minutes',
        price: 12.30,
        userId: 2,
        driverId: 2,
      },
    ];

    await Ride.bulkCreate(rides);
    console.log('Rides added successfully');
    process.exit(0);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    console.error(`Error seeding drivers: ${errorMessage}`);
    process.exit(1);
  }
};

seedRides();
