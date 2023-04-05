import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import type { nRodeoEvent } from '@common/types'
import EventItem from './EventItem'
import { useSession } from 'next-auth/react';
import Badge from '@mui/material/Badge';

type Props = {
  events: nRodeoEvent[];
  editingEvents: boolean;
}

const EventsList: React.FC<Props> = ({events, editingEvents}) => {
  const router = useRouter();
  const {data: session} = useSession();
  const isParticipant = session?.user?.type === "participant";

  return (
    <Stack>
      {events.map(event => {
        const listItem = (
          <EventItem 
            event={event}
            onEventClick={() => router.push(`/rodeos/${encodeURIComponent(event.rodeoId)}/${encodeURIComponent(event.id)}`)}
            editingEvents={editingEvents}
          />
        )

        if (isParticipant) {
          // todo: instead, browse participant entries for this event
          if (event.entries.some(entry => entry.participantId === session.user.id)) {
            return (
              <li key={event.id} style={{listStyleType: 'none', marginBlock: '.4em'}}>
                <Badge badgeContent={'Entered ✓'} color="secondary">
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
