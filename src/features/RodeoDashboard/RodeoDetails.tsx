import PageDetails from "@common/dataDisplay/PageDetails";
import type { Rodeo } from "@prisma/client";
import { buildEventAgeString, formatDate } from "@common/utils";

type Props = {
  location: Rodeo['location'];
  date: Rodeo['date'];
  notes: Rodeo['notes'];
}

const RodeoDetails: React.FC<Props> = ({location, date, notes}) => {
  return (
    <PageDetails
      headers={['Location', 'Date', 'Notes']}
    >
      <p>{location}</p>
      <p>{formatDate(date)}</p>
      <p>{notes}</p>
    </PageDetails>
  )
}

export default RodeoDetails;