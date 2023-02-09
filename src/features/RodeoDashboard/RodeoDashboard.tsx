import { useState } from 'react';
import type { Rodeo } from '@prisma/client'
import AllRodeosGrid from './AllRodeosGrid';
import RodeoView from './RodeoView/RodeoView';
import { Button, Dialog } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

type Props = {
  rodeos: Rodeo[]
}

const RodeoDashboard: React.FC<Props> = ({rodeos}) => {
  const router = useRouter();
  const [viewRodeo, setViewRodeo] = useState<Rodeo>(null)

  return (<>
    <Link
      href={'/rodeos/create'}
    >
      {/* <Button variant="outlined" onClick={handleCreateClick}>
        open Create
      </Button> */}
      open create
    </Link>

    {/* <Dialog 
      open={!!router.query.}
    >


    </Dialog> */}

    {!viewRodeo ? (
      <AllRodeosGrid
        rodeos={rodeos}
        onCardClick={setViewRodeo}
      />
    ) : (<RodeoView rodeo={viewRodeo} />)}
  </>)
}

export default RodeoDashboard;
