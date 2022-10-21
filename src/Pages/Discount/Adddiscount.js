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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { postDiscount, updateBusfees, loading, toast } from '../../actions/discount';



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

  const formik = useFormik({
    initialValues: {
      discountName: '',
      busFees: false,
      tuitionFees: false,
      bookFees: false,
    },
    validationSchema: Yup.object({
      discountName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    }),
    onSubmit: values => {
      dispatch(postDiscount(values));
      dispatch(loading(true));
      dispatch(toast(false));
      formik.resetForm();
      setOpen(false);
    },
  });

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
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <div style={{display:'flex', flexDirection:'column'}}>
        <TextField
        style={{margin:0, marginBottom: 0}}
          name="discountName"
          label="Discount Name"
          value={formik.values.disCount}
          onChange= {formik.handleChange}
          onBlur={formik.handleBlur}
        />
         {formik.touched.disCount && formik.errors.disCount  ? (
         <div style={{color: 'red'}}>{formik.errors.disCount}</div>
       ) : null}
         <FormControlLabel sx={{marginTop: 2}} control={<Checkbox name="busFees" onChange= {formik.handleChange} />} label="Bus Fees" />
         <FormControlLabel sx={{marginTop: 2}} control={<Checkbox name="tuitionFees"  onChange= {formik.handleChange}/>} label="Tution Fees" />
         <FormControlLabel sx={{marginTop: 2}} control={<Checkbox name="bookFees"  onChange= {formik.handleChange}/>} label="Book Fees" />
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', marginTop: 10}}>
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