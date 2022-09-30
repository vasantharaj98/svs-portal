import React, {useState, useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {Autocomplete} from '@mui/material';
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

const top100Films = ['A', 'B'];

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
        dispatch(updateBusfees(currentId, postData));
        dispatch(loading(true));
        dispatch(toast(false));
        setCurrentid(null);
        setTimeout(() => {
          setCurrentid(null);
        }, dispatch(updateBusfees(currentId, postData)));
        // if(dispatch(updateBusfees(currentId, postData))){
        //   setCurrentid(null);
        // };
      }
      else{

        dispatch(postBusfees(postData));
        dispatch(loading(true));
        dispatch(toast(false));

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
      <Autocomplete
        multiple
        id="tags-outlined"
        options={top100Films}
        sx={{margin: 10}}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ '&.MuiTextField-root':{
              margin: 0,
            },
          }}
            label="Select Class Name"
            placeholder="classnames"
          />
        )}
      />
        <TextField
          required
          id="outlined-required"
          label="Tuition Fees"
          value={postData.busno}
          onChange= { (e)=> setPostdata({...postData, busno: e.target.value})}
        />
        <TextField
          id="outlined-number"
          label="Book Fees"
          type="number"
          value={postData.twowayfees}
          onChange= { (e)=> setPostdata({...postData, twowayfees: e.target.value})}
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
      <div style={{display: 'flex', justifyContent: 'flex-end', margin: 10}}>
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