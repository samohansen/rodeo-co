import { buildEventAgeStringNoParen, formatDate } from "@common/utils";
import type { RodeoEvent } from "@prisma/client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type Props = {
  event: RodeoEvent;
}

const EventDetails: React.FC<Props> = ({event}) => {
  const {time, minAge, maxAge, fee, prize} = event;

  return (
    <Box>
      <Box>
        <Typography variant='overline' color="gray">Entry fee</Typography>
        <Typography variant='body1'>{fee ? `$${fee}` : 'None'}</Typography>
      </Box>
      {minAge || maxAge ? (
        <Box sx={{paddingTop: 2}}>
          <Typography variant='overline' color="gray">Age limits</Typography>
          <Typography variant='body1'>{buildEventAgeStringNoParen({minAge, maxAge})}</Typography>
        </Box>
      ) : null}
      {time ? (
        <Box sx={{paddingTop: 2}}>
          <Typography variant='overline' color="gray">Scheduled time</Typography>
          <Typography variant='body1'>{formatDate(time)}</Typography>
        </Box>
      ) : null}
    </Box>
  )
}

export default EventDetails;
