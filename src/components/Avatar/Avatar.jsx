import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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

function AvatarCard(props) {

    const [open, setOpen] = React.useState(false);
    const {username,userId} = props;
    const [checked, setChecked] = React.useState([1]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                 {username}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                User {props.username} Info
                </Typography>

            </CardContent>

            <CardActions>
              {localStorage.getItem("currentUser") === props.userId ? <Button size="small">Change Avatar</Button>
              : ""}
                <Button size="small">Learn More</Button>
            </CardActions>
      </Card> 


      <Button style={{marginLeft:75,bottom:70}} onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
         <div>Hello</div>
        </Box>
      </Modal>
    </div>
    
  )
}

export default AvatarCard