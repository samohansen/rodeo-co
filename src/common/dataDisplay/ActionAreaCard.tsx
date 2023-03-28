import { Card, CardMedia, CardContent, CardActionArea, Typography } from '@mui/material';
import AspectRatio from '@mui/joy/AspectRatio';
import Image from 'next/legacy/image';

type Props = {
  onClick: () => void;
  title: string;
  bodyLine1?: string;
  bodyLine2?: string;
  imgSrc?: string;
}

// Not sure how best to handle images for this guy. Putting it off for now. 
const ActionAreaCard: React.FC<Props> = ({onClick, title, bodyLine1, bodyLine2, imgSrc}) => {
  return (
    <Card style={{maxWidth: '360px', minWidth:'250px'}}>
      <CardActionArea
        onClick={onClick}
      >
        <AspectRatio minHeight={140} maxHeight={200} ratio="3/2">
          <CardMedia >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {/* todo: figure out good props to use on this, for sizing and stuff */}
              <Image
                src={imgSrc} 
                alt='rodeo image'
                layout='fill'
              />
            </div>
          </CardMedia>
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
