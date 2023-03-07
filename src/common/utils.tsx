export function buildEventAgeString({minAge, maxAge}: {minAge: number | string, maxAge: number | string}): string {
  return minAge 
    ? ` (${minAge}${maxAge ?  `-${maxAge}` : '+'})`
    : ''
}

// null date? return empty string
export function formatDate(date: Date): string {
  if (!date) return '';
  return date.toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"});
}