import ActionAreaCard from "@common/dataDisplay/ActionAreaCard";
import { formatDate } from "@common/utils";

const RodeoCard = ({rodeo, onClick}) => {
  const {name, location, date} = rodeo

  return (
    <ActionAreaCard
      title={name}
      bodyLine1={location}
      bodyLine2={formatDate(date)}
      onClick={onClick}
      imgSrc={rodeo.imgSrc || '/1.png'}
    />
  )
}

export default RodeoCard;
