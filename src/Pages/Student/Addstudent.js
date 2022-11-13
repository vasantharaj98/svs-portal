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
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../Layouts/Themesetup/index';
import {GetApp, FileUpload} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { postStudent, updateBusfees, loading, toast } from '../../actions/student';
import { flexbox } from '@mui/system';
import { Typography } from '@mui/material';
import TabPanel from '../../Components/Tab';



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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Adddata = ({currentId, setCurrentid, button, year}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
  setOpen(false);
  // setCurrentid(null);
  setRoute({routeName: ""});
  setDiscount({disCount: ""});
  setDate({dob: null});
  };


  const dispatch = useDispatch();

  const className = useSelector((state)=> state.classs);
  const RouteName = useSelector((state)=> state.busfees);
  const DisCount = useSelector((state)=> state.discount);

  const updatePost = useSelector ((state) => currentId ? state.busfees.busfees.find((p) => p._id === currentId ) : null );

  const [route, setRoute] = useState({routeName: ''});

  const handleChange = (e) =>{
      setRoute({routeName: e.target.value})
  }

  const [discount, setDiscount] = useState({disCount: ''});

  const handleChange1 = (e) =>{
      setDiscount({disCount: e.target.value})
  }

  const [date, setDate] = useState({dob: null});

  const handleDate = (newValue) =>{
    setDate({dob: newValue})
    if(newValue){
      formik.setFieldValue("dob", newValue.format('YYYY-MM-DD'));
      formik.setFieldValue("batchYear", year);
    }
  }

  const [key, setKey] = useState(null);

  const handleClick = (event, key) => {
    setKey(key);
    }

    const [key1, setKey1] = useState(null);

    const handleClick1 = (event, key) => {
      setKey1(key);
      }

      const [key2, setKey2] = useState(null);

      const handleClick2 = (event, key) => {
        setKey2(key);
        }

      const busuidd = key1!==null ? RouteName.busfees[key1].uniqueId : null;
      const discountuidd = key2!==null ? DisCount.data[key2].uniqueId : null;

      useEffect(()=>{
          formik.setFieldValue('busUuid',  busuidd);
      },[route])

      useEffect(()=>{
        formik.setFieldValue('discountUuid',  discountuidd);
    },[discount])

//   useEffect(()=>{
//     if(currentId){
//       setOpen(true);
//       setPostdata(updatePost);
//     }
// },[updatePost])

const [value, setValue] = useState(0);

const handleTab = (event, newValue) => {
  setValue(newValue);
};


  const formik = useFormik({
    initialValues: {
      name: '',
      studentId: '',
      mobileNumber:'',
      adharNumber:'',
      email:'',
      dob:null,
      studentCaste:'',
      studentReligion:'',
      batchYear:'',
      className: '',
      sectionName:'',
      busService: true,
      busUuid:'',
      busNumber:'',
      discountUuid:'',
      directorDiscount: 0,
      directorUuidWhoProvidedDiscount:null,
      discountReason:'',
      fatherName:'',
      motherName:'',
      fatherMobileNo:'',
      motherMobileNo:'',
      homeMobileNo:'',
      fatherOccupation:'',
      motherOccupation:'',
      fatherCaste:'',
      motherCaste:'',
      fatherReligion:'',
      motherReligion:'',
      address1:'',
      address2:''
    },
    validationSchema: Yup.object().shape({
      studentId: Yup.string()
        .required('Required'),
     name: Yup.string()
        .required('Required'),
     mobileNumber: Yup.number()
        .required('Required'),
    adharNumber: Yup.number()
        .required('Required'),
    email: Yup.string()
        .required('Required'), 
    dob: Yup.string()
        .required('Required'),
    className: Yup.string()
        .required('Required'),
    sectionName: Yup.string()
        .required('Required'),
    busNumber: Yup.string()
        .required('Required'),
    }),
    onSubmit: values => {
      dispatch(postStudent(values));
      formik.resetForm();
      handleClose();
      dispatch(loading(true));
      // setOpen(false);
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="outlined" color="primary">
          {<FileUpload />} Export
        </Button>
        <Button variant="outlined" color="primary" sx={{ mx: 2 }}>
          {<GetApp />}Import
        </Button>
        <Button onClick={handleOpen} variant="contained" size='medium' color='buttoncolor' sx={{color: '#fff'}}>
          {button}
        </Button>
      </div>
      <Dialog
        fullWidth
        maxWidth='lg'
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
         <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 2, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
        <DialogTitle id="alert-dialog-title">
          Basic Information
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Grid container spacing={2} sx={{overflow:'hidden'}}>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="studentId"
                    label="Student Id"
                    value={formik.values.studentId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.studentId && formik.errors.studentId ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.studentId}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="name"
                    label="Student Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.name}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="mobileNumber"
                    label="Mobile Number"
                    value={formik.values.mobileNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.mobileNumber}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin: "0",
                        width: "100%",
                      },
                    }}
                    id="adharNumber"
                    label="Aadhaar Number"
                    value={formik.values.adharNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.adharNumber && formik.errors.adharNumber ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.adharNumber}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin: "0",
                        width: "100%",
                      },
                    }}
                    type="email"
                    id="email"
                    label="Email Id"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.email}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      name="dob"
                      label="DOB"
                      inputFormat="DD-MM-YYYY"
                      value={date.dob}
                      onChange={(newValue) => {
                        handleDate(newValue)
                      }}
                      renderInput={(params) => <TextField sx={{
                        "&.MuiTextField-root": {
                          margin: "0",
                          width: "100%",
                        },
                      }} {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin: "0",
                        width: "100%",
                      },
                    }}
                    id="studentCaste"
                    label="Student Caste"
                    value={formik.values.studentCaste}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.studentCaste && formik.errors.studentCaste ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.studentCaste}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin: "0",
                        width: "100%",
                      },
                    }}
                    id="studentReligion"
                    label="Student Religion"
                    value={formik.values.studentReligion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.studentReligion && formik.errors.studentReligion ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.studentReligion}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl
                    sx={{ margin: "0", width: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="class"
                      label="Class"
                      name="className"
                      value={formik.values.className}
                      onChange={formik.handleChange}
                    >
                      {className?.data.map((ye, key)=>{
                        return <MenuItem key={key} onClick={event => handleClick(event, key)} value={ye.className}>{ye.className}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
                  {formik.touched.class && formik.errors.class ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.class}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl
                    sx={{ margin: "0", width: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Section
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="section"
                      name="sectionName"
                      label="Section"
                      value={formik.values.sectionName}
                      onChange={formik.handleChange}
                    >
                      {key !== null ? 
                      className.data[key].sectionName.split(',') .map((v)=>{
                        return <MenuItem value={v}>{v}</MenuItem>
                      })
                      : null}
                    </Select>
                  </FormControl>
                  {formik.touched.section && formik.errors.section ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.section}
                    </div>
                  ) : null}
                </Grid>
              </Grid>
              <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 2 }}>
        <Tabs value={value} onChange={handleTab} aria-label="basic tabs example">
          <Tab label="Parent Details" {...a11yProps(0)} />
          <Tab label="Contact Details" {...a11yProps(1)} />
          <Tab label="Transport" {...a11yProps(2)} />
          <Tab label="Discount" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Grid container spacing={2} sx={{overflow:'hidden', '& .css-19kzrtu':{ padding:'0'}}}>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="fatherName"
                    label="Father Name"
                    value={formik.values.fatherName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.fatherName && formik.errors.fatherName ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.fatherName}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="fatherOccupation"
                    label="Father Occupation"
                    value={formik.values.fatherOccupation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.fatherOccupation && formik.errors.fatherOccupation ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.fatherOccupation}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="fatherMobileNo"
                    label="Father Mobile No"
                    value={formik.values.fatherMobileNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.fatherMobileNo && formik.errors.fatherMobileNo ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.fatherMobileNo}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="fatherCaste"
                    label="Father Caste"
                    value={formik.values.fatherCaste}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.fatherCaste && formik.errors.fatherCaste ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.fatherCaste}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="fatherReligion"
                    label="Father Religion"
                    value={formik.values.fatherReligion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.fatherReligion && formik.errors.fatherReligion ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.fatherReligion}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="motherName"
                    label="Mother Name"
                    value={formik.values.motherName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.motherName && formik.errors.motherName ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.motherName}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="motherOccupation"
                    label="Mother Occupation"
                    value={formik.values.motherOccupation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.motherOccupation && formik.errors.motherOccupation ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.motherOccupation}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="motherMobileNo"
                    label="Mother Mobile No"
                    value={formik.values.motherMobileNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.motherMobileNo && formik.errors.motherMobileNo ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.motherMobileNo}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="motherCaste"
                    label="Mother Caste"
                    value={formik.values.motherCaste}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.motherCaste && formik.errors.motherCaste ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.motherCaste}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="motherReligion"
                    label="Mother Religion"
                    value={formik.values.motherReligion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.motherReligion && formik.errors.motherReligion ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.motherReligion}
                    </div>
                  ) : null}
                </Grid>
      </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Grid container spacing={2} sx={{overflow:'hidden', '& .css-19kzrtu':{ padding:'0'}}}>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="homeMobileNo"
                    label="Home Mobile No"
                    value={formik.values.homeMobileNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.homeMobileNo && formik.errors.homeMobileNo ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.homeMobileNo}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="address1"
                    label="Address Line 1"
                    value={formik.values.address1}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.address1 && formik.errors.address1 ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.address1}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="address2"
                    label="Address Line 2"
                    value={formik.values.address2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.address2 && formik.errors.address2 ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.address2}
                    </div>
                  ) : null}
                </Grid>
      </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Grid container spacing={2} sx={{overflow:'hidden'}}>
      <Grid item xs={12} md={12}>
                    <FormControlLabel sx={{ margin: "0", marginTop: 1, width: "100%" }} control={<Checkbox name="busService" defaultChecked onChange= {formik.handleChange} />} label="Bus Service" />
                </Grid>
      {formik.values.busService ? (
                  <>
                    <Grid item xs={12} md={4}>
                      <FormControl
                        sx={{ margin: "0", width: "100%" }}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Bus Route
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="busRoute"
                          label="Bus Route"
                          name="busRoute"
                          value={route.routeName}
                          onChange={handleChange}
                        >
                        {RouteName?.busfees.map((ye, key)=>{
                        return <MenuItem key={key} onClick={event => handleClick1(event, key)} value={ye.routeName}>{ye.routeName}</MenuItem>
                      })}
                        </Select>
                      </FormControl>
                      {formik.touched.busRoute && formik.errors.busRoute ? (
                        <div style={{ marginLeft: "15px", color: "red" }}>
                          {formik.errors.busRoute}
                        </div>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl
                        sx={{ margin: "0", width: "100%" }}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Bus No
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="busNo"
                          label="Bus Number"
                          name="busNumber"
                          value={formik.values.busNumber}
                          onChange={formik.handleChange}
                        >
                      {key1 !== null ? 
                      RouteName.busfees[key1].busNumber.map((v)=>{
                        return <MenuItem value={v}>{v}</MenuItem>
                      })
                      : null}
                        </Select>
                      </FormControl>
                      {formik.touched.busNumber && formik.errors.busNumber ? (
                        <div style={{ marginLeft: "15px", color: "red" }}>
                          {formik.errors.busNumber}
                        </div>
                      ) : null}
                    </Grid>
                  </>
                ) : null}
      </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <Grid container spacing={2} sx={{overflow:'hidden', '& .css-19kzrtu':{ padding:'0'}}}>
                <Grid item xs={12} md={4}>
                      <FormControl
                        sx={{ margin: "0", width: "100%" }}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Discount
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="discount"
                          label="Discount"
                          name="discount"
                          value={discount.disCount}
                          onChange={handleChange1}
                        >
                        { DisCount?.data.map((ye, key)=>{
                        return <MenuItem key={key} onClick={event => handleClick2(event, key)} value={ye.discountName}>{ye.discountName}</MenuItem>
                      })}
                        </Select>
                      </FormControl>
                      {formik.touched.busRoute && formik.errors.busRoute ? (
                        <div style={{ marginLeft: "15px", color: "red" }}>
                          {formik.errors.busRoute}
                        </div>
                      ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="directorDiscount"
                    label="Director Discount"
                    value={formik.values.directorDiscount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.directorDiscount && formik.errors.directorDiscount ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.directorDiscount}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="directorUuidWhoProvidedDiscount"
                    label="Who Provide Director Discount"
                    value={formik.values.directorUuidWhoProvidedDiscount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.directorUuidWhoProvidedDiscount && formik.errors.directorUuidWhoProvidedDiscount ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.directorUuidWhoProvidedDiscount}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin:'0',
                        width: "100%",
                      },
                    }}
                    name="discountReason"
                    label="Discount Reason"
                    value={formik.values.discountReason}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.discountReason && formik.errors.discountReason ? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.discountReason}
                    </div>
                  ) : null}
                </Grid>
      </Grid>
      </TabPanel>
    </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{marginBottom:'10px', marginRight: '20px'}}>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit" size="large" variant='contained' autoFocus>
            Submit
          </Button>
        </DialogActions>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}


export default Adddata;