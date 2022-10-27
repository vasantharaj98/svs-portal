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
import { postFees, loading, toast } from '../../actions/fees';



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
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
  formik.resetForm();
  setOpen(false);
  };


  const dispatch = useDispatch();

  const className = useSelector((state)=> state.classs);

  const top100Films = className?.data.map((ye)=>{
    return ye.className;
 });

  const formik = useFormik({
    initialValues: {
      className: '',
      bookFees: 0,
      term1: 0,
      term2: 0,
      term3: 0,
      year: ''
    },
    validationSchema: Yup.object({
     bookFees: Yup.number()
        .required('Required'),
     term1: Yup.number()
        .required('Required'),
      term2: Yup.number()
        .required('Required'),
      term3: Yup.number()
        .required('Required'),
    }),
    onSubmit: values => {
      console.log("academic fees", values);
      dispatch(postFees(values));
      dispatch(loading(true));
      dispatch(toast(false));
      formik.resetForm();
      handleClose();
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
      <div style={{display: 'flex'}}>
      <div>
      <Autocomplete
        disablePortal
        id="className"
        name="className"
        options={top100Films}
        value={formik.values?.className}
        onChange={(event, value) => {
          formik.setFieldValue('className', value)
          formik.setFieldValue('year', year)
        }}
        renderInput={(params) => <TextField {...params} label="Select Class Name" />}
        />
      </div>
       <div>
        <TextField
         sx={{ '&.MuiTextField-root':{
        },
      }}
          name="bookFees"
          label="Book Fees"
          type="number"
          value={formik.values.bookFees}
          onChange= {formik.handleChange}
          onBlur={formik.handleBlur}
        />
         {formik.touched.bookFees && formik.errors.bookFees  ? (
         <div style={{color: 'red'}}>{formik.errors.bookFees}</div>
       ) : null}
       </div>
       <div>
       <TextField
        sx={{ '&.MuiTextField-root':{
       },
     }}
         name="term1"
         label="Term 1"
         type="number"
       value={formik.values.term1}
         onChange= {formik.handleChange}
         onBlur={formik.handleBlur}
       />
        {formik.touched.term1 && formik.errors.term1  ? (
        <div style={{color: 'red'}}>{formik.errors.term1}</div>
      ) : null}
       </div>
       </div>
        <div style={{display: 'flex'}}>
      <div>
      <TextField
        sx={{ '&.MuiTextField-root':{
       },
     }}
         name="term2"
         label="Term 2"
         type="number"
       value={formik.values.term2}
         onChange= {formik.handleChange}
         onBlur={formik.handleBlur}
       />
        {formik.touched.term2 && formik.errors.term2  ? (
        <div style={{color: 'red'}}>{formik.errors.term2}</div>
      ) : null}
      </div>
      <div>
      <TextField
        sx={{ '&.MuiTextField-root':{
       },
     }}
         name="term3"
         label="Term 3"
         type="number"
       value={formik.values.term3}
         onChange= {formik.handleChange}
         onBlur={formik.handleBlur}
       />
        {formik.touched.term3 && formik.errors.term3  ? (
        <div style={{color: 'red'}}>{formik.errors.term3}</div>
      ) : null}
      </div>
      <div>
        <TextField
        sx={{ '&.MuiTextField-root':{
        },
      }}
          type='number'
          name="totalFees"
          label="Total Fees"
          value={parseInt(formik.values.bookFees)+parseInt(formik.values.term1)+parseInt(formik.values.term2)+parseInt(formik.values.term3)}
          id="outlined-read-only-input"
          InputProps={{
            readOnly: true,
          }}
        />
       </div>
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