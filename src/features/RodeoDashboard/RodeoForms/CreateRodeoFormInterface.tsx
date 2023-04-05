import axios from 'axios';
import CreateRodeoModal from "./CreateRodeoModal";
import type { Rodeo } from '@prisma/client';
import { useRouter, usePathname }  from 'next/navigation';
import {rodeoImageUrls} from '@common/utils';

export type RodeoFormModel = {
  name: string;
  location: string;
  date: Date;
  notes: string;
  imgSrc: string;
}

type Props = {
  onClose?: () => void;
} & ({
  editing: true;
  rodeo: Rodeo;
} | {
  editing?: false;
  rodeo?: never;
})

const CreateRodeoFormInterface: React.FC<Props> = ({editing = false, rodeo, onClose}) => {
  // in other areas of the app, we're using next/router instead of next/navigation
  // todo: LEARN MORE ABOUT ROUTING and the differences between next 13 and <13
  const router = useRouter();
  const path = usePathname();

  let data;
  // initialize data with rodeo info
  if (editing) {
    if (!rodeo) {
      // todo: fetch data using the id in the route?
    }
    data = rodeo;
  }

  // todo: if loading data, show loading UI

  // prepare default form values
  const defaultValues = {
    name: data?.name || '',
    location: data?.location || '',
    date: new Date(data?.date) || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // todo: make this actually work
    notes: data?.notes || '',
    imgSrc: data?.imgSrc || rodeoImageUrls[Math.floor(Math.random() * 11)]
  }

  // make appropriate api call, handle page changes
  const handleSubmit = async (data: RodeoFormModel) => {
    // todo: wrap these in try/catches?
    if (editing) {
      await axios.patch(`/api/rodeos/${rodeo.id}`, data);
      router.replace(path); // forces a client-side transition to same route, refreshing server side props but maintaining other state (i think)
    } 
    else {
      // todo2: or perhaps initialize loading *here*
      // followup: yes, methinks here
      const res = await axios.post('/api/rodeos', data);
      router.push(`/rodeos/${encodeURIComponent(res.data.id)}`); // redirect to new rodeo's page
      // todo: add loader here? I *think* that would be effective
    }
    onClose();
  }

  return (
    <CreateRodeoModal defaultValues={defaultValues} onSubmit={handleSubmit} onClose={onClose}/>
  )
};

export default CreateRodeoFormInterface;
