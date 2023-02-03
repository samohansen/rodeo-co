import { Card, CardMedia, CardContent, CardActionArea, Typography } from '@mui/material';
import logo from '../../src/logo.svg';

// Not sure how best to handle images for this guy. Putting it off for now. 
const ActionAreaCard = ({onClick, title, bodyLine1, bodyLine2}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea
        onClick={onClick}
      >
        <CardMedia
          component="img"
          height="140"
          image={logo}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {bodyLine1}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {bodyLine2}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ActionAreaCard;