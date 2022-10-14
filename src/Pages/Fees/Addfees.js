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

  const formik = useFormik({
    initialValues: {
      className:[],
      tutionFees: '',
      bookFees: '',
      totalFees:'',
    },
    validationSchema: Yup.object({
      tutionFees: Yup.number()
        .required('Required'),
     bookFees: Yup.number()
        .required('Required'),
     totalFees: Yup.number()
        .required('Required'),
    }),
    onSubmit: values => {
      console.log("academic fees", values);
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
      <div style={{display: 'flex', flexDirection:'column'}}>
      <Autocomplete
        multiple
        id="className"
        name="className"
        onChange={(event, newValue) => {
          formik.setFieldValue('className', newValue);
        }}
        options={top100Films}
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
            value={formik.values?.className}
          />
        )}
      />
        <TextField
        sx={{ '&.MuiTextField-root':{
          margin: 0,
          marginTop: '15px'
        },
      }}
          type='number'
          id="tutionFees"
          label="Tuition Fees"
          value={formik.values.tutionFees}
          onChange= {formik.handleChange}
          onBlur={formik.handleBlur}
        />
         {formik.touched.tutionFees && formik.errors.tutionFees  ? (
         <div style={{color: 'red'}}>{formik.errors.tutionFees}</div>
       ) : null}
        <TextField
         sx={{ '&.MuiTextField-root':{
          margin: 0,
          marginTop: '15px'
        },
      }}
          id="bookFees"
          label="Book Fees"
          type="number"
          value={formik.values.bookFees}
          onChange= {formik.handleChange}
          onBlur={formik.handleBlur}
        />
         {formik.touched.bookFees && formik.errors.bookFees  ? (
         <div style={{color: 'red'}}>{formik.errors.bookFees}</div>
       ) : null}
        <TextField
         sx={{ '&.MuiTextField-root':{
          margin: 0,
          marginTop: '15px'
        },
      }}
          id="totalFees"
          label="Total Fees"
          type="number"
        value={formik.values.totalFees}
          onChange= {formik.handleChange}
          onBlur={formik.handleBlur}
        />
         {formik.touched.totalFees && formik.errors.totalFees  ? (
         <div style={{color: 'red'}}>{formik.errors.totalFees}</div>
       ) : null}
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
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