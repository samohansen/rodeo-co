import type { RodeoEvent } from "@prisma/client";
import axios from 'axios';
import { useRouter, usePathname }  from 'next/navigation';
import EventEntryModal from "./EventEntryModal";

export type EntryModel = {
  horseName: string;
  eventId: string;
  participantId: string;
}

type Props = {
  onClose?: () => void;
  event: RodeoEvent;
  participantId: string;
}

const EventEntryInterface: React.FC<Props> = ({event, participantId, onClose}) => {
  // in other areas of the app, we're using next/router instead of next/navigation
  // todo: LEARN MORE ABOUT ROUTING and the differences between next 13 and <13
  const router = useRouter();
  const path = usePathname();

  // prepare default form values
  const defaultValues: EntryModel = {
    horseName: '',
    eventId: event.id,
    participantId: participantId,
  }

  // make appropriate api call, handle page changes
  const handleSubmit = async (data: EntryModel) => {
    await axios.post(`/api/entries`, data);
    // todo: do we want to redirect after creation of an event, or stay on the list view?
    router.replace(path);
    onClose();
  }

  return (
    <EventEntryModal defaultValues={defaultValues} onSubmit={handleSubmit} onClose={onClose}/>
  )
};

export default EventEntryInterface;
