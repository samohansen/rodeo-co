-- DropForeignKey
ALTER TABLE "EventEntry" DROP CONSTRAINT "EventEntry_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventEntry" DROP CONSTRAINT "EventEntry_participantId_fkey";

-- DropForeignKey
ALTER TABLE "Rodeo" DROP CONSTRAINT "Rodeo_adminId_fkey";

-- DropForeignKey
ALTER TABLE "RodeoEvent" DROP CONSTRAINT "RodeoEvent_rodeoId_fkey";

-- AddForeignKey
ALTER TABLE "Rodeo" ADD CONSTRAINT "Rodeo_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RodeoEvent" ADD CONSTRAINT "RodeoEvent_rodeoId_fkey" FOREIGN KEY ("rodeoId") REFERENCES "Rodeo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventEntry" ADD CONSTRAINT "EventEntry_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventEntry" ADD CONSTRAINT "EventEntry_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "RodeoEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
