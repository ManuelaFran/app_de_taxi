import express from 'express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { initModels } from './models/index';
import rideRoutes from './routes/ride';

dotenv.config();

const app = express();
app.use(express.json());

// Configuração do Sequelize e inicialização dos modelos
const sequelize = new Sequelize(
  process.env.DB_NAME || 'taxi_app',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false, // Desativa logs SQL para um console mais limpo
  }
);

const initializeDatabase = async () => {
  try {
    // Testa conexão e inicializa modelos
    await sequelize.authenticate();
    console.log('Database connection established successfully!');
    initModels(sequelize);
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully!');
  } catch (error) {
    console.error('Error initializing database:', error instanceof Error ? error.message : error);
    process.exit(1); // Encerra a aplicação em caso de erro no banco de dados
  }
};

// Rota inicial
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Rotas da aplicação
app.use('/api', rideRoutes);

// Inicializa o servidor e conecta ao banco de dados
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initializeDatabase(); // Inicializa o banco de dados ao iniciar o servidor
});