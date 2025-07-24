import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './Avatar.css'

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
    <div className="avatar-card-root">
        <Card className="avatar-card" >
            <CardMedia
                className="avatar-card-media"
                sx={{ height: 240 }}
                image="/public/default-profile-picture1.jpg"
                title="User avatar"
            />

            <CardContent>

                <Typography gutterBottom variant="h5" component="div">
                 {username}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Click for User Info
                </Typography>

            </CardContent>

            <CardActions>
                <Button onClick={handleOpen} size="small">Learn More</Button>
            </CardActions>
      </Card> 


       <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          BackdropProps={{
            style: { backgroundColor: "rgba(0,0,0,0.4)" }
          }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
              User Info
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }} align="center">
              <strong>User ID:</strong> {userId}
              <br />
              <strong>Username:</strong> {username}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3, display: 'block', mx: 'auto' }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Box>
        </Modal>
    </div>
    
  )
}

export default AvatarCard