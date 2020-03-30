const days = {
  LUNDI: 'MONDAY',
  MARDI: 'TUESDAY',
  MERCREDI: 'WEDNESDAY',
  JEUDI: 'THURSDAY',
  VENDREDI: 'FRIDAY',
  SAMEDI: 'SATURDAY',
  DIMANCHE: 'SUNDAY'
};
export function getDays() {
  return days;
}
export function getFrenchDays() {
  return Object.keys(days);
}

export function getEnglishDays() {
  return Object.values(days);
}
