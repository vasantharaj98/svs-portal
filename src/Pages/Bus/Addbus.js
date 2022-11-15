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
import { postBusfees, updateBusfees, loading, toast } from '../../actions/busfees';



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

const Adddata = ({currentId, setCurrentid, button, year}) => {
  const [open, setOpen] = useState(false);
  console.log("open", open);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
  setOpen(false);
  setCurrentid(null);
  setPostdata({ routeName: '' , busNumber: '', twoWayFees: '', fullFees: '', specialTrip: '', totalFees: '' });
  };


  const [postData, setPostdata ] = useState ({ routeName: '' , busNumber: '', twoWayFees: '', fullFees: '', specialTrip: '', totalFees: '', year:'' });

  const postvalue = [postData]

  const dispatch = useDispatch();

  const updatePost = useSelector ((state) => currentId ? state.busfees.busfees.find((p) => p._id === currentId ) : null );


  useEffect(()=>{
    if(updatePost && currentId){
      setOpen(true);
      setPostdata(updatePost);
    }
},[updatePost])


  const handleSubmit = (e) =>{
      e.preventDefault();
      setOpen(false);
      if(currentId){
        dispatch(updateBusfees(currentId, postvalue));
        dispatch(loading(true));
        dispatch(toast(false));
        setCurrentid(null);
        setTimeout(() => {
          setCurrentid(null);
        }, dispatch(updateBusfees(currentId, postvalue)));
        // if(dispatch(updateBusfees(currentId, postData))){
        //   setCurrentid(null);
        // };
      }
      else{

        dispatch(postBusfees(postvalue));
        dispatch(loading(true));
        dispatch(toast(false));
      }
      setPostdata({ routeName: '' , busNumber: '', twoWayFees: '', fullFees: '', specialTrip: '', totalFees: '' });
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <Button onClick={handleOpen} variant="contained" size="medium" color='buttoncolor' sx={{color: '#fff'}}>{button}</Button>
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
          value={postData?.routeName}
          onChange= { (e)=> setPostdata({...postData, routeName: e.target.value, year: year})}
        />
        <TextField
          required
          id="outlined-required"
          label="Bus No"
          value={postData?.busNumber}
          onChange= { (e)=> setPostdata({...postData, busNumber: e.target.value.split(",")})}
        />
        <TextField
          id="outlined-number"
          label="Two way Fees"
          type="number"
          value={postData?.twoWayFees}
          onChange= { (e)=> setPostdata({...postData, twoWayFees: parseInt(e.target.value)})}
          />
          <TextField
          id="outlined-number"
          label="Full Fees"
          type="number"
          value={postData?.fullFees}
          onChange= { (e)=> setPostdata({...postData, fullFees: parseInt(e.target.value)})}
          />
          <TextField
          id="outlined-number"
          label="Special Trip Fees"
          type="number"
          value={postData?.specialTrip}
          onChange= { (e)=> setPostdata({...postData, specialTrip: parseInt(e.target.value)})}
          />
        <TextField
          id="outlined-read-only-input"
          label="Total Fees"
          type="number"
          value={ parseInt(postData?.twoWayFees) + parseInt(postData?.fullFees ) + parseInt(postData?.specialTrip) }         
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: 40, marginTop: 15}}>
        <Button variant="contained" color='primary' size="large" 
        type='submit'
        onClick= { ()=> setPostdata({...postData, totalFees: (parseInt(postData?.twoWayFees) + parseInt(postData?.fullFees ) + parseInt(postData?.specialTrip))})}
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