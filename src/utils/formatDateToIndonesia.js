export const formatDateToIndonesian = (isoDateString) => {
  if (!isoDateString) {
    return "Invalid Date";
  }
  const date = new Date(isoDateString);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  };
  const formatter = new Intl.DateTimeFormat("id-ID", options);
  return formatter.format(date).replace(",", " WIB -");
};
