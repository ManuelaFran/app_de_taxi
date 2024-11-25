import axios from 'axios';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const calculateRoute = async (origin: string, destination: string) => {
  if (!GOOGLE_API_KEY) {
    throw new Error('GOOGLE_API_KEY is not defined in the environment variables');
  }

  const url = `https://routes.googleapis.com/directions/v2:computeRoutes`;

  const requestBody = {
    origin: {
      location: {
        address: origin
      }
    },
    destination: {
      location: {
        address: destination
      }
    },
    travelMode: 'DRIVE',
    routingPreference: 'TRAFFIC_AWARE'
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_API_KEY
      }
    });
  
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching route from Google Maps:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
    throw new Error('Failed to fetch route from Google Maps API');
  }
};
