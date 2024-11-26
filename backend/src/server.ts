import express from 'express';
import dotenv from 'dotenv';
import './models/index';
import rideRoutes from './routes/ride';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', rideRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});