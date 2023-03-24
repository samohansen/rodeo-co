import { Card, CardMedia, CardContent, CardActionArea, Typography } from '@mui/material';
import AspectRatio from '@mui/joy/AspectRatio';

type Props = {
  onClick: () => void;
  title: string;
  bodyLine1?: string;
  bodyLine2?: string;
  imagePath?: string;
}



// Not sure how best to handle images for this guy. Putting it off for now. 
const ActionAreaCard: React.FC<Props> = ({onClick, title, bodyLine1, bodyLine2, imagePath = '7.png'}) => {
  return (
    <Card>
      <CardActionArea
        onClick={onClick}
      >
        <AspectRatio minHeight={140} maxHeight={200} ratio="3/2">
          <CardMedia
            component="img"
            image={imagePath}
            alt="rodeo image"
          />
        </AspectRatio>
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