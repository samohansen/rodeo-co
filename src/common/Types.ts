import { ReactNode } from "react";

export type LeftNavMenuItem = {
  text: string;
  icon: ReactNode;
}

export type Rodeo = {
  rodeoId: number;
  rodeoDetails: RodeoDetails;
  rodeoEvents: RodeoEvent[];
}

export type RodeoDetails = {
  name: string;
  location?: string;
  date?: string | Date;
  notes?: string;
}

export type RodeoEvent = {
  eventId: number;
  name: string;
  // ageLimits: number[];
  minAge?: number;
  maxAge?: number;
  participantEntries?: ParticipantEntry[];
}

type Participant = {
  participantId: number;
  name: string;
}

type ParticipantEntry = {
  participant: Participant;
  horse: string;
  time?: number;
}