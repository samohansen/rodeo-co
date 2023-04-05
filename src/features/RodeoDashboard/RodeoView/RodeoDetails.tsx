import PageDetails from "@common/dataDisplay/PageDetails";
import type { Rodeo } from "@prisma/client";
import { formatDate } from "@common/utils";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type Props = {
  location: Rodeo['location'];
  date: Rodeo['date'];
  notes: Rodeo['notes'];
}

const RodeoDetails: React.FC<Props> = ({location, date, notes}) => {
  return (
    <Box>
      <Box>
        <Typography variant='overline' color="gray">Location</Typography>
        <Typography variant='body1'>{location}</Typography>
      </Box>
      <Box sx={{paddingTop: 2}}>
        <Typography variant='overline' color="gray">Date</Typography>
        <Typography variant='body1'>{formatDate(date)}</Typography>
      </Box>
      {notes ? (
        <Box sx={{paddingTop: 2}}>
          <Typography variant='overline' color="gray">Notes</Typography>
          <Typography variant='body1'>{notes}</Typography>
        </Box>
      ) : null}
    </Box>
  )
}

export default RodeoDetails;
