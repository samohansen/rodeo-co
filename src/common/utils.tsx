export function buildEventAgeString({minAge, maxAge}: {minAge: number | string, maxAge: number | string}): string {
  if (minAge) {
    return `${minAge}${maxAge ?  `-${maxAge}` : '+'}`
  }
}