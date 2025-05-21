export const formatPrice = (cents: number, currencyCode?: string) => {
  const config: Intl.NumberFormatOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  if (currencyCode) {
    config.style = "currency";
    config.currency = currencyCode;
  } else {
    config.style = "decimal";
  }

  const formatter = new Intl.NumberFormat("es-MX", config);

  return formatter.format(cents / 100);
};

export const formatTime = (string: string) => {
  if (!string) {
    return "";
  }

  const date = new Date(string);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Intl.DateTimeFormat("es-MX", options).format(date);
};
