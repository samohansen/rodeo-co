import { useState } from 'react';
import { Button } from "@mui/material";
import AllRodeosGrid from './AllRodeosGrid';
import RodeoView from './RodeoView/RodeoView';

const RodeoDashboard = ({rodeos}) => {
  const [viewRodeo, setViewRodeo] = useState(null)

  // const handleCardClick = (rodeo) => {
  //   setViewRodeo(rodeo);
  // }
  
  const handleRodeosHomeClick = () => {
    setViewRodeo(null);
  }

  return (<>
    {/* nav */}
    <Button onClick={handleRodeosHomeClick}>Rodeos</Button>

    {/* content */}
    {!viewRodeo ? (
      <AllRodeosGrid
        rodeos={rodeos}
        onCardClick={setViewRodeo}
      />
    ) : (
      <RodeoView rodeo={viewRodeo} />
    )}
  </>)
}

export default RodeoDashboard;
