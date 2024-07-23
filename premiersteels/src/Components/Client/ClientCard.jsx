import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CardHeader from '@mui/material/CardHeader';



import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import { red } from '@mui/material/colors';

import MoreVertIcon from '@mui/icons-material/MoreVert';



const ClientCard = ({ review }) => {
  const { id, name, date, comment, description } = review;

  return (
    <Card sx={{ maxWidth: 345, height: '100%' ,border:"solid 1px black",boxShadow:"0px 4px 20px rgba(0, 0, 0, 0.1)"}} key={id}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="avatar">
            {name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={date}
      />
      <CardContent sx={{ minHeight: '100%' }}>
        <Typography variant="h5" gutterBottom component="div">
          {comment}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View LinkedIn</Button>
      </CardActions>
    </Card>
  );
};

export default ClientCard;