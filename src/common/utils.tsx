import { nRodeo } from "./types";

export const rodeoImageUrls = [
  '/1.png',
  '/2.png',
  '/3.png',
  '/4.png',
  '/5.png',
  '/6.png',
  '/7.png',
  '/8.png',
  '/9.png',
  'https://i.imgur.com/PpVyL0c.png',
  'https://i.imgur.com/xNOdcGE.jpeg',
]

export function buildEventAgeString({minAge, maxAge}: {minAge: number | string, maxAge: number | string}): string {
  return minAge 
    ? ` (${minAge}${maxAge ?  `-${maxAge}` : '+'})`
    : maxAge 
    ? ` (up to ${maxAge})` 
    : ''
}

export function buildEventAgeStringNoParen({minAge, maxAge}: {minAge: number | string, maxAge: number | string}): string {
  return minAge 
    ? `${minAge}${maxAge ?  `-${maxAge}` : '+'}`
    : maxAge 
    ? `up to ${maxAge}` 
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

export const compareObjNames = (a, b) => {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  return nameA < nameB 
    ? -1
    : nameA > nameB 
    ? 1
    : 0
}
