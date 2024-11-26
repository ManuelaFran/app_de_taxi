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
    const routeData = await calculateRoute(origin, destination);

    const drivers = await Driver.findAll();
    const priceEstimates = drivers.map((driver) => ({
      driverId: driver.id,
      driverName: driver.name,
      vehicle: driver.vehicle,
      rating: driver.rating,
      price: driver.pricePerKm * (routeData.distance / 1000), // preço por km
    }));

    res.status(200).json({
      origin,
      destination,
      distance: routeData.distance,
      duration: routeData.duration,
      priceEstimates,
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
    const ride = await Ride.create({
      userId: customer_id,
      driverId: driver_id,
      origin,
      destination,
      price,
      distance: 0, // Pode ser calculado se necessário
    });

    res.status(200).json({
      message: 'Ride confirmed successfully',
      rideId: ride.id,
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

    const rides = await Ride.findAll({ where: whereClause });

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