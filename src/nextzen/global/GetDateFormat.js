export default function formatDateToYYYYMMDD(newValue) {
  const date = new Date(newValue?.$d);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}
