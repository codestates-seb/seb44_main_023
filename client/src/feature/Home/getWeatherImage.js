const weatherImages = new Map([
  //https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2

  //Group 2xx: Thunderstorm, Icon 11x
  [11, "번개태풍.png"],
  //Group 3xx: Drizzle, Icon 09x
  [9, "비.png"],
  //Group 5xx: Rain, Icon 10x
  [10, "비.png"],
  //Group 6xx: Snow, Icon 13x
  [13, "눈.png"],
  //Group 7xx: Atmosphere, Icon 50x
  [50, "안개.png"],
  //Group 800: Rain, Icon 01x
  [1, "맑음.png"],
  //Group 80x: Clouds, Icon 02x,03x,04x
  [2, "흐림.png"],
  [3, "흐림.png"],
  [4, "흐림.png"],
  // 추가적인 날씨 종류와 이미지 파일 경로를 정의할 수 있습니다.
]);

export function getWeatherImage(weatherType) {
  console.log("getBackground 1:", weatherType);

  const backgroundImage = weatherImages.get(weatherType);
  console.log("getBackground 2:", backgroundImage);

  return backgroundImage;
}

// 날씨 종류에 따른 이미지 파일 경로를 정의합니다.
// const weatherImages = {
//   //https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2

//   //Group 2xx: Thunderstorm, Icon 11x
//   11: "번개태풍.png",
//   //Group 3xx: Drizzle, Icon 09x
//   "09": "비.png",
//   //Group 5xx: Rain, Icon 10x
//   10: "비.png",
//   //Group 6xx: Snow, Icon 13x
//   13: "눈.png",
//   //Group 7xx: Atmosphere, Icon 50x
//   50: "안개.png",
//   //Group 800: Rain, Icon 01x
//   "01": "맑음.png",
//   //Group 80x: Clouds, Icon 02x,03x,04x
//   "02": "흐림.png",
//   "03": "흐림.png",
//   "04": "흐림.png",
//   // 추가적인 날씨 종류와 이미지 파일 경로를 정의할 수 있습니다.
// };
