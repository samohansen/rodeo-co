import type { nRodeo } from "@common/types";
import Grid from "@mui/material/Grid";
import RodeoCard from '@features/RodeoDashboard/RodeoCard';
import { useRouter } from 'next/router';
import Typography from "@mui/material/Typography";

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
        <Grid item>
          <Typography variant='subtitle1' color="text.secondary">
            No rodeos
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default RodeosGrid;
