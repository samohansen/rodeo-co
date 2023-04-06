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
        <Typography variant='overline' color="text.secondary">Location</Typography>
        <Typography variant='body1' color="text.primary">{location}</Typography>
      </Box>
      <Box sx={{paddingTop: 2}}>
        <Typography variant='overline' color="text.secondary">Date</Typography>
        <Typography variant='body1' color="text.primary">{formatDate(date)}</Typography>
      </Box>
      {notes ? (
        <Box sx={{paddingTop: 2}}>
          <Typography variant='overline' color="text.secondary">Notes</Typography>
          <Typography variant='body1' color="text.primary">{notes}</Typography>
        </Box>
      ) : null}
    </Box>
  )
}

export default RodeoDetails;
