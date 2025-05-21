export const formatPrice = (cents: number, currencyCode?: string) => {
  if (currencyCode === undefined) {
    return (cents / 100).toFixed(2);
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

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
