import axios from 'axios';

export const calculateRoute = async (
  origin: string,
  destination: string
): Promise<{
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
  distance: number;
  duration: string;
  routeResponse: object;
}> => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

  const response = await axios.get(url);
  const data = response.data;

  if (data.status !== 'OK') {
    throw new Error('Failed to fetch route from Google Maps');
  }

  const route = data.routes[0];
  const leg = route.legs[0]; // Pegamos a primeira perna da rota

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
    duration: leg.duration.text, // Duração formatada (ex: "1 hour 30 mins")
    routeResponse: data, // Resposta completa da API, caso seja útil
  };
};