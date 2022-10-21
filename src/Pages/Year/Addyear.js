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
import { updateBusfees, loading, toast } from '../../actions/busfees';
import {postYear} from '../../actions/year'



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

const Adddata = ({currentId, setCurrentid, button, vchange, setVchange}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
  setOpen(false);
  setCurrentid(null);
  setPostdata({ batchYear: '' });
  };


  const [postData, setPostdata ] = useState ({ batchYear: '' });

  const postvalue = postData;

  console.log(postvalue);

  const dispatch = useDispatch();

  const updatePost = useSelector ((state) => currentId ? state.busfees.busfees.find((p) => p._id === currentId ) : null );


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

        dispatch(postYear(postvalue));
        dispatch(loading(true));
        dispatch(toast(false));
        // setVchange(!vchange);
      }
      setPostdata({ batchYear: '' });
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <Button onClick={handleOpen} variant="contained" size="large" color='buttoncolor' sx={{color: '#fff'}}>{button}</Button>
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
          type="number"
          maxlength="4" 
          id="outlined-required"
          label="Batch Year"
          value={postData.routeName}
          onInput = {(e) =>{
            e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,4)
          }}
          onChange= { (e)=> setPostdata({...postData,batchYear: e.target.value})}
        />
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: 15}}>
        <Button variant="contained" color='primary' size="large" 
        type='submit'
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