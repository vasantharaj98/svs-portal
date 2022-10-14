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

  const formik = useFormik({
    initialValues: {
      disCount: '',
      discountPer: '',
    },
    validationSchema: Yup.object({
      disCount: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      discountPer: Yup.number()
        .required('Required'),
    }),
    onSubmit: values => {
      console.log("discount", values.disCount);
      formik.resetForm();
      setOpen(false);
    },
  });

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
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <div style={{display:'flex', flexDirection:'column'}}>
        <TextField
        style={{margin:0, marginBottom: 0}}
          id="disCount"
          label="Discount Type"
          value={formik.values.disCount}
          onChange= {formik.handleChange}
          onBlur={formik.handleBlur}
        />
         {formik.touched.disCount && formik.errors.disCount  ? (
         <div style={{color: 'red'}}>{formik.errors.disCount}</div>
       ) : null}
         <TextField
        style={{margin:0, marginBottom: 0, marginTop: 15}}
          type='number'
          id="discountPer"
          label="Discount Percentage"
          value={formik.values.discountPer}
          onChange= {formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.discountPer && formik.errors.discountPer ? (
         <div style={{color: 'red'}}>{formik.errors.discountPer}</div>
       ) : null}
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