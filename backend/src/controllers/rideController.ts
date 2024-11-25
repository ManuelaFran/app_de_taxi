import { Request, Response } from 'express';
import { calculateRoute } from '../services/googleMapsService';

export const estimateRide = async (req: Request, res: Response) => {
  const { origin, destination, customer_id } = req.body;

  if (!origin || !destination || !customer_id) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Origin, destination, and customer_id are required'
    });
  }

  try {
    const routeData = await calculateRoute(origin, destination);
    res.status(200).json({
      origin: routeData.origin,
      destination: routeData.destination,
      distance: routeData.distanceMeters,
      duration: routeData.duration,
      routeResponse: routeData
    });
  } catch (error) {
    res.status(500).json({
      error_code: 'API_ERROR',
      error_description: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

