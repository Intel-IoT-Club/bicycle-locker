export const calculateFare = (minutes) => {
    const baseFare = 50;
    const extraRate = 2;
    const included = 10;

    const extra = Math.max(0, minutes - included);
    return baseFare + extra * extraRate;
};
