export function buildEventAgeString({minAge, maxAge}: {minAge: number | string, maxAge: number | string}): string {
  if (minAge) {
    return `${minAge}${maxAge ?  `-${maxAge}` : '+'}`
  }
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"})
}