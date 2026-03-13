// helpers/date.ts

export const formatBRDate = (date: Date, includeTime: boolean = false) => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  if (includeTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }

  const formattedDate = new Intl.DateTimeFormat("pt-BR", options).format(date);

  // Se pedir a hora, troca a vírgula padrão por "às" para ficar bonito
  return includeTime ? formattedDate.replace(",", " às") : formattedDate;
};
