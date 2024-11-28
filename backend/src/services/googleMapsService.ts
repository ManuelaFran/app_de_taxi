import axios from 'axios';

export const calculateRoute = async (
  origin: string,
  destination: string
): Promise<{
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
  distance: number;
  duration: string;
}> => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(destination)}&key=${apiKey}`;

  const response = await axios.get(url);
  const data = response.data;

  if (data.status !== 'OK') {
    throw new Error('Failed to fetch route from Google Maps API.');
  }

  const route = data.routes[0];
  const leg = route.legs[0];

  return {
    origin: {
      latitude: leg.start_location.lat,
      longitude: leg.start_location.lng,
    },
    destination: {
      latitude: leg.end_location.lat,
      longitude: leg.end_location.lng,
    },
    distance: leg.distance.value, // Distância em metros
    duration: leg.duration.text, // Duração formatada
  };
};