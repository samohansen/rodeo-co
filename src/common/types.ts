import { ReactNode } from "react";
import type { RodeoEvent, Rodeo } from '@prisma/client';
 
export type LeftNavMenuItem = {
  label: string;
  path: string;
  icon: ReactNode;
};

// The following schema objects are manually typed because Prisma's 
// generated types don't include relations. They otherwise inherit from prisma
export type nRodeo = {
  events: RodeoEvent[] 
} & Rodeo;