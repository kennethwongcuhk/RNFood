export function toRoundedString(num) {
  return Math.round(num).toString();
}

export function precise(num) {
  return num.toFixed(1);
}

export function getCalories({carbohydrates, fat , protein , weight}) {
  return (carbohydrates * 4.1 + fat * 9.5 + protein * 4.2) * weight / 100;
}