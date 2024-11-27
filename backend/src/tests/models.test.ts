import { Sequelize } from 'sequelize';
import { initModels, User, Driver, Ride } from '../models';

describe('Model Associations', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize('sqlite::memory:', { logging: false });
    initModels(sequelize);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('User has many Rides', async () => {
    const user = await User.create({ name: 'John Doe', email: 'john@example.com' });
    const ride = await Ride.create({ origin: 'A', destination: 'B', distance: 10, duration: '10m', price: 100, userId: user.id, driverId: 1 });

    const rides = await user.getRides();
    expect(rides.length).toBe(1);
  });

  test('Ride belongs to Driver', async () => {
    const driver = await Driver.create({ name: 'Test Driver', description: 'Test', vehicle: 'Car', value: 5.0 });
    const ride = await Ride.create({ origin: 'A', destination: 'B', distance: 10, duration: '10m', price: 100, userId: 1, driverId: driver.id });

    const rideDriver = await ride.getDriver();
    expect(rideDriver.name).toBe('Test Driver');
  });
});