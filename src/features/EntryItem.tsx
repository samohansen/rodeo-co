import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {buildEventTitleString} from '@common/utils'
import styles from '@features/RodeoDashboard/RodeoView/EventItem.module.css'

const EntryItem = ({event, href}) => {
  return (<>
    <Button className={styles.chip} href={href} >
      <Box component='span' className={styles.chipText}>
        {buildEventTitleString(event)}
      </Box>
    </Button>
  </>
  )
}

export default EntryItem;
