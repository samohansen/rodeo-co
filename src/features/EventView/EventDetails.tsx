import { buildEventAgeString } from "@common/utils";

const EventDetails = ({event}) => {
  const {time, minAge, maxAge, fee, prize} = event;

  return (
    <div>
      <h2>
        Scheduled Time
      </h2>
      <h5>
        {time}
      </h5>
      <h2>
        Age limits
      </h2>
      <h5>
        {buildEventAgeString({minAge, maxAge})}
      </h5>
      <h2>
        Entry fee
      </h2>
      <h5>
        ${fee}
      </h5>
      <h2>
        Prize pot 
      </h2>
      <h5>
        {prize}
      </h5>
    </div>
  )
}

export default EventDetails;