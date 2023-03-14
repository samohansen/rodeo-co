import { buildEventAgeString, formatDate } from "@common/utils";
import PageDetails from "@common/dataDisplay/PageDetails";
import type { RodeoEvent } from "@prisma/client";

type Props = {
  event: RodeoEvent;
}

const EventDetails: React.FC<Props> = ({event}) => {
  const {time, minAge, maxAge, fee, prize} = event;

  return (
    <PageDetails
      headers={['Scheduled time', 'Age limits', 'Entry fee', 'Prize pot']}
    >
      <p>{formatDate(time)}</p>
      <p>{buildEventAgeString({minAge, maxAge})}</p>
      <p>${fee}</p>
      <p>${prize}</p>
    </PageDetails>
  )
}

export default EventDetails;