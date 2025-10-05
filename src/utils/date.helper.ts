export function getFutureDate(days: number = 1): string {
  const today = new Date();
  today.setDate(today.getDate() + days);

  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
}

export function isValidDDMMYYYY(date: string, separator: '/' | '-' = '/'): void {
  const regex = new RegExp(`^\\d{2}\\${separator}\\d{2}\\${separator}\\d{4}$`);
  if (!regex.test(date)) {
    throw new Error(`holidayDate must be in dd${separator}mm${separator}yyyy format`);
  }
}