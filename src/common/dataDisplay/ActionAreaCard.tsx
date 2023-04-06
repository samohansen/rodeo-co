import { Card, CardMedia, CardContent, CardActionArea, Typography } from '@mui/material';
import AspectRatio from '@mui/joy/AspectRatio';
import Image from 'next/legacy/image';

type Props = {
  onClick: () => void;
  title: string;
  bodyLine1?: string;
  bodyLine2?: string;
  bodyLine3?: string;
  imgSrc?: string;
}

// Not sure how best to handle images for this guy. Putting it off for now. 
const ActionAreaCard: React.FC<Props> = ({onClick, title, bodyLine1, bodyLine2, bodyLine3, imgSrc}) => {
  return (
    <Card style={{maxWidth: '300px', minWidth:'200px', width: '100%'}}>
      <CardActionArea
        onClick={onClick}
        sx={{height: '100%'}}
      >
        <AspectRatio minHeight={140} maxHeight={200} ratio="3/2">
          <CardMedia
              component="img"
              image={imgSrc}
              alt="rodeo image"
            />
        </AspectRatio>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {bodyLine1}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {bodyLine2}
          </Typography>
          {bodyLine3 && (
            <Typography variant="caption" color="gray">
              {bodyLine3}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ActionAreaCard;
