import { useState } from 'react';
import type { Rodeo } from '@common/Types';
import { Button } from "@mui/material";
import AllRodeosGrid from './AllRodeosGrid';
import RodeoView from './RodeoView/RodeoView';

type Props = {
  rodeos: Rodeo[]
}

const RodeoDashboard: React.FC<Props> = ({rodeos}) => {
  const [viewRodeo, setViewRodeo] = useState<Rodeo>(null)

  // const handleCardClick = (rodeo) => {
  //   setViewRodeo(rodeo);
  // }
  
  return (<>
    {!viewRodeo ? (
      <AllRodeosGrid
        rodeos={rodeos}
        onCardClick={setViewRodeo}
      />
    ) : (<RodeoView rodeo={viewRodeo} />)}
  </>)
}

export default RodeoDashboard;
