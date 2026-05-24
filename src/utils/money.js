export function formatMoney(cents) {
  // Truncate (not round) to 2 decimal places
  const dollars = Math.floor(cents / 100 * 100) / 100;
  const isNegative = cents < 0;
  const absoluteDollars = Math.abs(dollars).toFixed(2);
  
  // Format with comma separators
  const parts = absoluteDollars.split('.');
  const integerPart = parseInt(parts[0]).toLocaleString('en-US');
  const formattedDollars = integerPart + '.' + parts[1];
  
  return isNegative ? `-$${formattedDollars}` : `$${formattedDollars}`;
}

// Alias for backwards compatibility
export const formatPrice = formatMoney;