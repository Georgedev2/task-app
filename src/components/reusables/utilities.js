export function getDate() {
  '2021/01/25T20:55:30.724Z'.replace(/T\d+:\d+:\d+\.\d{2,}Z/, ''); // returns "2021/01/25"
  return new Date().toISOString().replace(/T\d+:\d+:\d+\.\d{2,}Z/, '');
}
