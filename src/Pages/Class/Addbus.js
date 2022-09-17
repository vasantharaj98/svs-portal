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
import MultipleValueTextInput from 'react-multivalue-text-input';
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
      // if(currentId){
      //   dispatch(updateBusfees(currentId, postData));
      //   dispatch(loading(true));
      //   dispatch(toast(false));
      //   setCurrentid(null);
      //   setTimeout(() => {
      //     setCurrentid(null);
      //   }, dispatch(updateBusfees(currentId, postData)));
      // }
      // else{

      //   dispatch(postBusfees(postData));
      //   dispatch(loading(true));
      //   dispatch(toast(false));

      // }
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
        style={{margin:0, marginBottom: 15}}
          required
          id="outlined-required"
          label="Class Name"
          value={postData.routename}
          onChange= { (e)=> setPostdata({...postData, routename: e.target.value})}
        />
        <MultipleValueTextInput style={{height:'50px'}}
        onItemAdded={(item, allItems) => console.log(`Item added: ${item}`)}
        onItemDeleted={(item, allItems) => console.log(`Item removed: ${item}`)}
        name="item-input"
        placeholder="Sections*"
        />
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginRight: 40, marginTop: 15}}>
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