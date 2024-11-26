import sequelize from '../models/index';
import User from '../models/User';

const seedUsers = async () => {
  try {
    await sequelize.authenticate();

    const users = [
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
      },
      {
        name: 'Bob Brown',
        email: 'bob@example.com',
      },
    ];

    await User.bulkCreate(users);
    console.log('Users added successfully');
    process.exit(0);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    console.error(`Error seeding drivers: ${errorMessage}`);
    process.exit(1);
  }
};

seedUsers();
