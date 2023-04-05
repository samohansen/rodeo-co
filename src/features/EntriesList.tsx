import type { nEventEntry } from '@common/types';
import Stack from '@mui/material/Stack';
import EntryItem from './EntryItem'

type Props = {
  entries: nEventEntry[]
}

// todo: display more helpful info here
const EntriesList: React.FC<Props> = ({entries}) => {
  return (
    <Stack>
      {entries.map(entry => (
        <li key={entry.event.id} style={{listStyleType: 'none',  marginBlock: '.4em'}}>
          <EntryItem 
            event={entry.event}
            href={`/rodeos/${encodeURIComponent(entry.event.rodeoId)}/${encodeURIComponent(entry.event.id)}`}
          />
        </li> 
      ))}
    </Stack>
  )
}

export default EntriesList;
