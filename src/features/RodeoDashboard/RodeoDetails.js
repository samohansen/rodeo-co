const RodeoDetails = ({location, date, notes}) => {
  return (
    <div>
      <h5>Location</h5>
      <h1>{location}</h1>
      <h5>Date</h5>
      <h1>{date}</h1>
      <h5>Notes</h5>
      <h1>{notes}</h1>
    </div>
  )
}

export default RodeoDetails;