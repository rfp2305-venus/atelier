// converts timestamp date to ideal format
export default function getDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  });
}