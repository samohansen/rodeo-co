import ActionAreaCard from "@common/dataDisplay/ActionAreaCard";
import { formatDate } from "@common/utils";

const RodeoCard = ({rodeo, onClick}) => {
  const rodeoImages = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '10.png']
  const {name, location, date} = rodeo

  return (
    <ActionAreaCard 
      title={name}
      bodyLine1={location}
      bodyLine2={formatDate(date)}
      onClick={onClick}
      imagePath={rodeoImages[Math.floor(Math.random() * 9)]}
    />
  )
}

export default RodeoCard;