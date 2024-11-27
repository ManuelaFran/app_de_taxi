import { Sequelize } from 'sequelize';
import { initModels, Driver } from '../models/index';
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

const seedDrivers = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully for seeding drivers.');

    initModels(sequelize);

    const drivers = [
      {
        name: 'Homer Simpson',
        description: 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
        vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
        review: { rating: 2/5, comment: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts' },
        value: 2.5,
      },
      {
        name: 'Dominic Toretto',
        description: 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
        vehicle: 'Dodge Charger R/T 1970 modificado',
        review: { rating: 4/5, comment: 'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!' },
        value: 5.0,
      },
      {
        name: 'James Bond',
        description: 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
        vehicle: 'Aston Martin DB5 clássico',
        review: { rating: 5/5, comment: 'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.' },
        value: 10.0,
      },
    ];

    await Driver.bulkCreate(drivers);
    console.log('Drivers added successfully!');
  } catch (error) {
    console.error('Error seeding drivers:', error instanceof Error ? error.message : error);
  } finally {
    await sequelize.close();
    process.exit();
  }
};

seedDrivers();
