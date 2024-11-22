import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('taxi_app', 'root', 'root', {
    host: 'db',
    dialect: 'mysql'
});

export default sequelize;