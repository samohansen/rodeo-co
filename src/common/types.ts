import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { RodeoEvent, Rodeo, EventEntry, User } from '@prisma/client';
 
export type LeftNavMenuItem = {
  label: string;
  path: string;
  icon: ReactNode;
};

// The following schema objects are manually typed because Prisma's 
// generated types don't include relations. They otherwise inherit from prisma
export type nRodeo = Rodeo & {
  events: RodeoEvent[] 
};
export type nRodeoEvent = RodeoEvent & {
  rodeo: Rodeo;
  entries: nEventEntry[];
}
export type nEventEntry = EventEntry & {
  participant: User;
  event: RodeoEvent;
}

// Next.js type for reactive layouts
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}