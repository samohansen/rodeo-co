import { nRodeo } from "./types";

export function buildEventAgeString({minAge, maxAge}: {minAge: number | string, maxAge: number | string}): string {
  return minAge 
    ? ` (${minAge}${maxAge ?  `-${maxAge}` : '+'})`
    : maxAge 
    ? ` (up to ${maxAge})` 
    : ''
}

export const buildEventTitleString = (event) => {
  return `${event.name}${buildEventAgeString(event)}`
}

// null date? return empty string
export function formatDate(date: Date): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"});
}

export const partitionRodeos = (rodeos: nRodeo[]): [nRodeo[], nRodeo[]] => {
  const pastRodeos = [];
  const futureRodeos = [];

  const today = (new Date).toISOString();
  rodeos.forEach(rodeo => {
    rodeo.date <= today 
      ? pastRodeos.push(rodeo)
      : futureRodeos.push(rodeo)
  })

  return [pastRodeos, futureRodeos];
}
