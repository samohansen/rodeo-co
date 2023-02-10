import ActionAreaCard from "@common/dataDisplay/ActionAreaCard";

const RodeoCard = ({rodeo, onClick}) => {
  const {name, location, date} = rodeo

  return (
    <ActionAreaCard 
      title={name}
      bodyLine1={location}
      bodyLine2={date}
      onClick={onClick}
    />
  )
}

export default RodeoCard;