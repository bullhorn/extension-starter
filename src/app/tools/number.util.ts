export const getNumber = (value: any): number => parseFloat(value) || 0.00;

export const formatNumber = (value: any): string => (Math.round(getNumber(value) * 100) / 100).toFixed(2);

export const formatPercentage = (value: any): string => {
  if (value > 0) {
    if (value < 1) {
      return formatNumber(value);
    }

    return formatNumber(value / 100);
  }

  return formatNumber(0.00);
};
