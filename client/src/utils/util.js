//숫자를 반올림하여 소수점 첫번째자리까지 표시하는 함수
export function roundDecimal(number) {
  return Math.round(number * 10) / 10;
}

//숫자를 버림하여 소수점 첫번째자리까지 표시하는 함수
export function removeDecimal(number) {
  return Math.floor(number * 10) / 10;
}
