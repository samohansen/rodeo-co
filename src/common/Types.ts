import { ReactNode } from "react";

export type LeftNavMenuItem = {
  label: string;
  path: string;
  icon: ReactNode;
}

// export type Rodeo = {
//   rodeoId: number;
//   name: string;
//   location?: string;
//   date?: string | Date;
//   notes?: string;  rodeoEvents: RodeoEvent[];
// }

// export type RodeoEvent = {
//   eventId: number;
//   name: string;
//   // ageLimits: number[];
//   minAge?: number;
//   maxAge?: number;
//   participantEntries?: ParticipantEntry[];
// }

// type ParticipantEntry = {
//   participant: Participant;
//   horse: string;
//   time?: number;
// }

// type Participant = {
//   participantId: number;
//   name: string;
// }