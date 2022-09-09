import React, {useState, useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../Layouts/Themesetup/index';
import { useDispatch, useSelector } from 'react-redux';
import { postBusfees, updateBusfees } from '../../actions/busfees';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const Adddata = ({currentId, setCurrentid, button}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
  setOpen(false);
  setCurrentid(null);
  setPostdata({ routename: '' , busno: '', twowayfees: '', fullfees: '', specialtripfees: '', totalfees: '' });
  };


  const [postData, setPostdata ] = useState ({ routename: '' , busno: '', twowayfees: '', fullfees: '', specialtripfees: '', totalfees: '' });


  const dispatch = useDispatch();

  const updatePost = useSelector ((state) => currentId ? state.busfees.find((p) => p._id === currentId ) : null );


  useEffect(()=>{
    if(currentId){
      setOpen(true);
      setPostdata(updatePost);
    }
},[updatePost])


  const handleSubmit = (e) =>{
      e.preventDefault();
      setOpen(false);
      if(currentId){
        dispatch(updateBusfees(currentId, postData));
        setCurrentid(null);
      }
      else{

        dispatch(postBusfees(postData));
      }
      setPostdata({ routename: '' , busno: '', twowayfees: '', fullfees: '', specialtripfees: '', totalfees: '' });
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 15}}>
      <Button onClick={handleOpen} variant="contained" color='primary'>{button}</Button>
      </div> 
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Route Name"
          value={postData.routename}
          onChange= { (e)=> setPostdata({...postData, routename: e.target.value})}
        />
        <TextField
          required
          id="outlined-required"
          label="Bus No"
          value={postData.busno}
          onChange= { (e)=> setPostdata({...postData, busno: e.target.value})}
        />
        <TextField
          id="outlined-number"
          label="Two way Fees"
          type="number"
          value={postData.twowayfees}
          onChange= { (e)=> setPostdata({...postData, twowayfees: e.target.value})}
          />
          <TextField
          id="outlined-number"
          label="Full Fees"
          type="number"
          value={postData.fullfees}
          onChange= { (e)=> setPostdata({...postData, fullfees: e.target.value})}
          />
          <TextField
          id="outlined-number"
          label="Special Trip Fees"
          type="number"
          value={postData.specialtripfees}
          onChange= { (e)=> setPostdata({...postData, specialtripfees: e.target.value})}
          />
        <TextField
          id="outlined-read-only-input"
          label="Total Fees"
          type="number"
          value={ parseInt(postData.twowayfees) + parseInt(postData.fullfees ) + parseInt(postData.specialtripfees) }         
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: 40, marginTop: 15}}>
        <Button variant="contained" color='primary' size="large" 
        type='submit'
        onClick= { ()=> setPostdata({...postData, totalfees: parseInt(postData.twowayfees) + parseInt(postData.fullfees ) + parseInt(postData.specialtripfees)})}
        >Submit</Button>
      </div> 
      </Box>
          </Box>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
}


export default Adddata;