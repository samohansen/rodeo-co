import type { nRodeoEvent } from '@common/types'
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import EventItem from './EventItem'
import { useSession } from 'next-auth/react';

type Props = {
  events: nRodeoEvent[];
  editingEvents: boolean;
}

const EventsList: React.FC<Props> = ({events, editingEvents}) => {
  const {data: session} = useSession();
  const isParticipant = session?.user?.type === "participant";

  return (
    <Stack>
      {events.map(event => {
        const listItem = (
          <EventItem 
            event={event}
            eventHref={`/rodeos/${encodeURIComponent(event.rodeoId)}/${encodeURIComponent(event.id)}`}
            editingEvents={editingEvents}
          />
        )
        if (isParticipant) {
          // todo: instead, browse participant entries for this event
          if (event.entries.some(entry => entry.participantId === session.user.id)) {
            return (
              <li key={event.id} style={{listStyleType: 'none', marginBlock: '.4em'}}>
                <Badge badgeContent={'Entered ✓'} color="primary">
                  {listItem}
                </Badge>
              </li>
            )
          }
        }
        return (
          <li key={event.id} style={{listStyleType: 'none',  marginBlock: '.4em'}}>
            {listItem}
          </li> 
        )
      })}
    </Stack>
  )
}

export default EventsList;
