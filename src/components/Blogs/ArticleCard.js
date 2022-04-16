import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


export default function ArticleCard(props) {

    console.log(props.Data.imgSrc)
    let imagePath = `"../../assets/`+`${props.Data.imgSrc}"`
    console.log(imagePath)
  return (
    <Card sx={{ maxWidth: 395 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={props.icon}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.Data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.Data.data}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}