import { Request, Response } from 'express';
import { calculateRoute } from '../services/googleMapsService';
import Driver from '../models/Driver';
import Ride from '../models/Ride';

export const estimateRide = async (req: Request, res: Response): Promise<void> => {
  const { origin, destination, customer_id } = req.body;

  if (!origin || !destination || !customer_id) {
    res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Origin, destination, and customer_id are required',
    });
    return;
  }

  try {
    // Obter os dados da rota, incluindo coordenadas, distância e duração
    const routeData = await calculateRoute(origin, destination);

    // Obter motoristas disponíveis e calcular preços estimados
    const drivers = await Driver.findAll();
    const options = drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: {
        rating: driver.review,
        comment: driver.review,
      },
      value: driver.value * (routeData.distance / 1000), // preço por km
    }));

    // Responder com os dados formatados
    res.status(200).json({
      origin: routeData.origin,
      destination: routeData.destination,
      distance: routeData.distance,
      duration: routeData.duration,
      options,
      routeResponse: routeData.routeResponse,
    });
  } catch (error) {
    res.status(500).json({
      error_code: 'API_ERROR',
      error_description: 'Failed to estimate ride',
    });
  }
};

export const confirmRide = async (req: Request, res: Response): Promise<void> => {
  const { customer_id, driver_id, origin, destination, price } = req.body;

  if (!customer_id || !driver_id || !origin || !destination || !price) {
    res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'All fields are required',
    });
    return;
  }

  try {
    // Calcula a duração e a distância usando a função calculateRoute
    const routeData = await calculateRoute(origin, destination);

    // Cria a corrida com duração e distância calculadas automaticamente
    const ride = await Ride.create({
      userId: customer_id,
      driverId: driver_id,
      origin,
      destination,
      distance: routeData.distance / 1000, // Converte para quilômetros
      duration: routeData.duration, // Duração formatada (ex: "15 minutes")
      price,
    });

    res.status(200).json({
      message: 'Ride confirmed successfully',
      rideId: ride.id,
      distance: routeData.distance,
      duration: routeData.duration,
    });
  } catch (error) {
    res.status(500).json({
      error_code: 'DB_ERROR',
      error_description: 'Failed to confirm ride',
    });
  }
};

export const getRideDetails = async (req: Request, res: Response): Promise<void> => {
  const { customer_id } = req.params;
  const { driver_id } = req.query;

  try {
    const whereClause: any = { userId: customer_id };
    if (driver_id) {
      whereClause.driverId = driver_id;
    }

    const rides = await Ride.findAll({
      where: whereClause,
      attributes: ['id', 'origin', 'destination', 'distance', 'duration', 'price', 'userId', 'driverId'],
    });

    if (!rides.length) {
      res.status(404).json({ message: 'No rides found' });
      return;
    }

    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({
      error_code: 'DB_ERROR',
      error_description: 'Failed to fetch ride details',
    });
  }
};