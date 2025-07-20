import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles({
    root : {
        maxWidth:345,
        margin : 100,
    }
})

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AvatarCard() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [checked, setChecked] = React.useState([1]);

//   const handleToggle = (value) => () => {
//     const currentIndex = checked.indexOf(value);
//     const newChecked = [...checked];

//     if (currentIndex === -1) {
//       newChecked.push(value);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }

//     setChecked(newChecked);
//   };
  
  
    return (
    <div>
        <Card sx={{ maxWidth: 345,margin : 10 }}>
            <CardMedia
                sx={{ height: 240 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="User avatar"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Username
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                User Info
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Change Avatar</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
      </Card> 


      <Button style={{marginLeft:75,bottom:70}} onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <div>Hello</div>
        </Box>
      </Modal>
    </div>
    
  )
}

export default AvatarCard