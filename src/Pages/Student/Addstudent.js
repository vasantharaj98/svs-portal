import React, {useState, useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../Layouts/Themesetup/index';
import {GetApp, FileUpload} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
import { postBusfees, updateBusfees, loading, toast } from '../../actions/busfees';
import { flexbox } from '@mui/system';



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


const StudentSchema =  Yup.object().shape({
  studentId: Yup.string()
    .required('Required'),
 studentName: Yup.string()
    .required('Required'),
 mobileNumber: Yup.number()
    .required('Required'),
aadhaarNumber: Yup.number()
    .required('Required'),
class: Yup.string()
    .required('Required'), 
section: Yup.string()
    .required('Required'),
busRoute: Yup.string()
    .required('Required'),
busNo: Yup.string()
    .required('Required'),
});

const studentSchema1 =  Yup.object({
  studentId: Yup.string()
    .required('Required'),
 studentName: Yup.string()
    .required('Required'),
 mobileNumber: Yup.number()
    .required('Required'),
aadhaarNumber: Yup.number()
    .required('Required'),
class: Yup.string()
    .required('Required'), 
section: Yup.string()
    .required('Required'),
});

const Adddata = ({currentId, setCurrentid, button}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
  setOpen(false);
  setCurrentid(null);
  setPostdata({ routename: '' , busno: '', twowayfees: '', fullfees: '', specialtripfees: '', totalfees: '' });
  };


  const [postData, setPostdata ] = useState ({ routename: '' , busno: '', twowayfees: '', fullfees: '', specialtripfees: '', totalfees: '' });

  const [value, setValue] = useState('yes');

  const handleChange = (event) => {
    setValue(event.target.value);
  };


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
      studentId: '',
      studentName: '',
      mobileNumber:'',
      aadhaarNumber:'',
      class: '',
      section:'',
      address:'',
      bus:'yes',
      busRoute:'',
      busNo:'',
    },
    validationSchema: Yup.object().shape({
      studentId: Yup.string()
        .required('Required'),
     studentName: Yup.string()
        .required('Required'),
     mobileNumber: Yup.number()
        .required('Required'),
    aadhaarNumber: Yup.number()
        .required('Required'),
    class: Yup.string()
        .required('Required'), 
    section: Yup.string()
        .required('Required'),
    address: Yup.string()
        .required('Required'),
    busRoute: Yup.string()
        .required('Required'),
    busNo: Yup.string()
        .required('Required'),
    }),
    onSubmit: values => {
      console.log("student", values);
      formik.resetForm();
      setOpen(false);
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 15}}>
      <Button variant="outlined" color='primary'>{<FileUpload/>} Export</Button>
      <Button variant="outlined" color='primary' sx={{mx: 1}}>{<GetApp/>}Import</Button>
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
      onSubmit={formik.handleSubmit}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
        <TextField
          sx={{ '&.MuiTextField-root':{
            margin: "15px",
            marginBottom: 0,
            width: '100%'
          }
        }}
          id="studentId"
          label="Student Id"
          value={formik.values.studentId}
          onChange= {formik.handleChange}
          onBlur={formik.handleBlur}
        />
         {formik.touched.studentId && formik.errors.studentId  ? (
         <div style={{marginLeft: "15px", color: 'red'}}>{formik.errors.studentId}</div>
       ) : null}
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField
           sx={{ '&.MuiTextField-root':{
            margin: "15px",
            marginBottom: 0,
            width: '100%'
          }
        }}
          id="studentName"
          label="Student Name"
          value={formik.values.studentName}
          onChange= {formik.handleChange}
          onBlur={formik.handleBlur}
        />
         {formik.touched.studentName && formik.errors.studentName  ? (
         <div style={{marginLeft: "15px", color: 'red'}}>{formik.errors.studentName}</div>
       ) : null}
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField
          sx={{ '&.MuiTextField-root':{
            margin: "15px",
            marginBottom: 0,
            width: '100%'
          }
        }}
          type='number'
          id="mobileNumber"
          label="Mobile Number"
          value={formik.values.mobileNumber}
          onChange= {formik.handleChange}
          onBlur={formik.handleBlur}
        />
         {formik.touched.mobileNumber && formik.errors.mobileNumber  ? (
         <div style={{marginLeft: "15px", color: 'red'}}>{formik.errors.mobileNumber}</div>
       ) : null}
        </Grid>
        <Grid item xs={12} md={4}>
        <TextField
          sx={{ '&.MuiTextField-root':{
            margin: "15px",
            marginBottom: 0,
            width: '100%'
          }
        }}
          type='number'
          id="aadhaarNumber"
          label="Aadhaar Number"
          value={formik.values.aadhaarNumber}
          onChange= {formik.handleChange}
          onBlur={formik.handleBlur}
        />
         {formik.touched.aadhaarNumber && formik.errors.aadhaarNumber  ? (
         <div style={{marginLeft: "15px", color: 'red'}}>{formik.errors.aadhaarNumber}</div>
       ) : null}
        </Grid>
        <Grid item xs={12} md={4}>
        <FormControl sx={{  margin: "15px",
            marginBottom: 0, width: '100%' }}>
          <InputLabel id="demo-simple-select-label">Class</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="class"
            label="Class"
            name='class'
            value={formik.values.class}
            onChange={formik.handleChange}
          >
            <MenuItem   value='UKG'>UKG</MenuItem>
            <MenuItem   value='LKG'>LKG</MenuItem>
            <MenuItem   value='1ST'>1ST</MenuItem>
          </Select>
      </FormControl>
      {formik.touched.class && formik.errors.class  ? (
         <div style={{marginLeft: "15px",color: 'red'}}>{formik.errors.class}</div>
       ) : null}
        </Grid>
        <Grid item xs={12} md={4}>
        <FormControl sx={{  margin: "15px",
            marginBottom: 0, width: '100%'}}>
          <InputLabel id="demo-simple-select-label">Section</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="section"
            name="section"
            label="Section"
            value={formik.values.section}
            onChange={formik.handleChange}
          >
            <MenuItem value='A'>A</MenuItem>
            <MenuItem value='B'>B</MenuItem>
            <MenuItem value='C'>C</MenuItem>
          </Select>
      </FormControl>
      {formik.touched.section && formik.errors.section ? (
         <div style={{marginLeft: "15px", color: 'red'}}>{formik.errors.section}</div>
       ) : null}
        </Grid>
        <Grid item xs={12}>
        <TextField
          sx={{ '&.MuiTextField-root':{
            margin: "15px",
            marginBottom: 0,
            width: '100%'
          }
        }}
          id="address"
          name="address"
          label="Address"
          value={formik.values.address}
          onChange= {formik.handleChange}
          onBlur={formik.handleBlur}
        />
         {formik.touched.address && formik.errors.address  ? (
         <div style={{marginLeft: "15px", color: 'red'}}>{formik.errors.address}</div>
       ) : null}
        </Grid>
        <Grid item xs={12} md={4}>
        <FormControl sx={{  margin: "15px",
            marginBottom: 0, width: '100%'}}>
      <FormLabel id="demo-row-radio-buttons-group-label">Bus</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="bus"
        value={formik.values.bus}
        onChange={formik.handleChange}
      >
        <FormControlLabel name="bus" value='yes' control={<Radio />} label="yes" />
        <FormControlLabel name="bus" value='no' control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
        </Grid>
        {formik.values.bus == "yes" 
    ?<><Grid item xs={12} md={4}>
          <FormControl sx={{  margin: "15px",
            marginBottom: 0, width: '100%'}}>
          <InputLabel id="demo-simple-select-label">Bus Route</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="busRoute"
            label="Bus Route"
            name='busRoute'
            value={formik.values.busRoute}
            onChange={formik.handleChange}
          >
            <MenuItem value='Tambaram'>Tambaram</MenuItem>
            <MenuItem value='T.Nagar'>T.Nagar</MenuItem>
            <MenuItem value='Mambalam'>Mambalam</MenuItem>
          </Select>
      </FormControl>
      {formik.touched.busRoute && formik.errors.busRoute ? (
         <div style={{marginLeft: "15px", color: 'red'}}>{formik.errors.busRoute}</div>
       ) : null}
        </Grid>
        <Grid item xs={12} md={4}>
        <FormControl sx={{  margin: "15px",
            marginBottom: 0, width: '100%'}}>
          <InputLabel id="demo-simple-select-label">Bus No</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="busNo"
            label="Bus No"
            name='busNo'
            value={formik.values.busNo}
            onChange={formik.handleChange}
          >
            <MenuItem value='TN48N6556'>TN48N6556</MenuItem>
            <MenuItem value='TN87V5665'>TN87V5665</MenuItem>
            <MenuItem value='TN87G6654'>TN87G6654</MenuItem>
          </Select>
      </FormControl>
      {formik.touched.busNo && formik.errors.busNo ? (
         <div style={{marginLeft: "15px", color: 'red'}}>{formik.errors.busNo}</div>
       ) : null}
        </Grid>
    </> : null
      }
      </Grid>
      <div style={{display: 'flex', justifyContent: 'center', marginRight: 40, marginTop: 15}}>
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