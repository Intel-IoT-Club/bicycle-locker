export const calculateFare = ({ distanceKm, durationMin, demandFactor = 1 }) => {
  const baseFare = 2.0; 
  const perKmRate = 1.5; 
  const perMinRate = 0.25;

  const fare = baseFare + (distanceKm * perKmRate) + (durationMin * perMinRate);
  return parseFloat((fare * demandFactor).toFixed(2));
};
