import axios from 'axios';
import type { RodeoEvent } from "@prisma/client";
import { useRouter, usePathname }  from 'next/navigation';
import CreateEventModal from "./CreateEventModal";

export type EventFormModel = {
  name: string;
  minAge: number;
  maxAge: number;
  fee: number;
  // prizePot: number;
}

type Props = {
  onClose?: () => void;
} & ({
  editing: true;
  event: RodeoEvent;
  rodeoId?: never;
} | {
  editing?: false;
  event?: never;
  rodeoId: string; // get id from route instead?
})

const CreateEventFormInterface: React.FC<Props> = ({editing = false, event, rodeoId, onClose}) => {
  // in other areas of the app, we're using next/router instead of next/navigation
  // todo: LEARN MORE ABOUT ROUTING and the differences between next 13 and <13
  const router = useRouter();
  const path = usePathname();

  let data;
  // initialize data with event info
  if (editing) {
    if (!event) {
      // fetch data using the id in the route?
    }
    data = event;
  }

  // todo: if loading data, show loading UI

  // prepare default form values
  const defaultValues = {
    name: data?.name || '',
    minAge: data?.minAge || '',
    maxAge: data?.maxAge || '',
    fee: data?.fee || '',
    // prizePot: data?.prizePot || '',
  }

  // make appropriate api call, handle page changes
  const handleSubmit = async (data: EventFormModel) => {
    if (editing) {
      await axios.patch(`/api/rodeos/${event.rodeoId}/${event.id}`, data);
    }
    else {
      await axios.post(`/api/rodeos/${rodeoId}`, data);
    }
    // todo: do we want to redirect after creation of an event, or stay on the list view?
    router.replace(path);
    onClose();
  }

  return (
    <CreateEventModal defaultValues={defaultValues} onSubmit={handleSubmit} onClose={onClose}/>
  )
};

export default CreateEventFormInterface;
