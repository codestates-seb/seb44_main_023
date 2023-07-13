export function getWeatherType(iconType) {
  let type = 0;
  if (iconType !== undefined) {
    //     type = int(iconType.slice(0, 2));
    //     parseInt(str, 10); // 10은 진법을 나타내며, 10진수로 변환하려면 기본값으로 사용합니다.
    // console.log(intValue); // 42
    type = parseInt(iconType.slice(0, 2), 10);
  }
  return type;
}
