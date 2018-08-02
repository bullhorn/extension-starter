export function getNumber(value: any): number {
  return parseFloat(value) || 0.00;
}

export function formatNumber(value: any): string {
  return (Math.round(getNumber(value) * 100) / 100).toFixed(2);
}

export function formatPercentage(value: any): string {
  if (value > 0) {
    if (value < 1) {
      return formatNumber(value);
    }

    return formatNumber(value / 100);
  }

  return formatNumber(0.00);
}
