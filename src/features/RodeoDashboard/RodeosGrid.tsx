import Grid from "@mui/material/Grid";
import RodeoCard from '@features/RodeoDashboard/RodeoCard';
import { useRouter } from 'next/router';
import { nRodeo } from "@common/types";

type Props = {
  rodeos: nRodeo[];
}

const RodeosGrid: React.FC<Props> = ({rodeos}) => {
  const router = useRouter();

  return (
    <Grid container spacing={3} justifyContent='flex-start'>
      {rodeos.length ? (
        rodeos.map(rodeo => (
          <Grid item xs={12} sm={6} md={4} key={rodeo.id} sx={{display: 'flex', justifyContent: 'center'}}>
            <RodeoCard 
              rodeo={rodeo}
              onClick={() => router.push(`/rodeos/${encodeURIComponent(rodeo.id)}`)}
            />
          </Grid>
        ))
      ) : (
        <Grid item>No rodeos</Grid>
      )}
    </Grid>
  )
}

export default RodeosGrid;
