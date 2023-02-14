import { Card, CardMedia, CardContent, CardActionArea, Typography } from '@mui/material';
import logo from "/public/hat-md.png";
import styles from './ActionAreaCard.module.css';

type Props = {
  onClick: () => void;
  title: string;
  bodyLine1?: string;
  bodyLine2?: string;
}

// Not sure how best to handle images for this guy. Putting it off for now. 
const ActionAreaCard: React.FC<Props> = ({onClick, title, bodyLine1, bodyLine2}) => {
  return (
    <Card className={styles.rodeoCard} sx={{ maxWidth: 345 }}>
      <CardActionArea
        onClick={onClick}
      >
        <CardMedia className={styles.rodeoCardImage}
          component="img"
          height="140"
          image={"saddlebronc.png"}
          alt="rodeo image"
        />
        <CardContent>
          <Typography className={styles.rodeoTitleText} gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography className={styles.rodeoText} variant="body2" color="text.secondary">
            {bodyLine1}
          </Typography>
          <Typography className={styles.rodeoText} variant="body2" color="text.secondary">
            {bodyLine2}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ActionAreaCard;