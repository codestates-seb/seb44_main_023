export function getWeatherType(iconType) {
  let type = 0;
  if (iconType !== undefined) {
    type = parseInt(iconType.slice(0, 2), 10);
  }
  return type;
}
