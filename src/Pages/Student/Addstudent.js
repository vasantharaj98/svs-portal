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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../Layouts/Themesetup/index';
import {GetApp, FileUpload} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
import { postStudent, updateBusfees, loading, toast } from '../../actions/student';
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
      formik.setFieldValue("year", year);
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


  const formik = useFormik({
    initialValues: {
      studentId: '',
      name: '',
      year:'',
      mobileNumber:'',
      adharNumber:'',
      email:'',
      dob:null,
      className: '',
      sectionName:'',
      busService: true,
      busUuid:'',
      busNumber:'',
      discountUuid:'',
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
                "& .MuiTextField-root": { m: 2, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin: "15px",
                        marginBottom: 0,
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
                        margin: "15px",
                        marginBottom: 0,
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
                        margin: "15px",
                        marginBottom: 0,
                        width: "100%",
                      },
                    }}
                    type="number"
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
                        margin: "15px",
                        marginBottom: 0,
                        width: "100%",
                      },
                    }}
                    type="number"
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
                        margin: "15px",
                        marginBottom: 0,
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
                          margin: "15px",
                          marginBottom: 0,
                          width: "100%",
                        },
                      }} {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl
                    sx={{ margin: "15px", marginBottom: 0, width: "100%" }}
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
                    sx={{ margin: "15px", marginBottom: 0, width: "100%" }}
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
                <Grid item xs={12} md={4}>
                    <FormControlLabel sx={{ margin: "15px", marginBottom: 0, marginTop: 3, width: "100%" }} control={<Checkbox name="busService" defaultChecked onChange= {formik.handleChange} />} label="Bus Service" />
                </Grid>
                {formik.values.busService ? (
                  <>
                    <Grid item xs={12} md={4}>
                      <FormControl
                        sx={{ margin: "15px", marginBottom: 0, width: "100%" }}
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
                        sx={{ margin: "15px", marginBottom: 0, width: "100%" }}
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
                <Grid item xs={12} md={4}>
                      <FormControl
                        sx={{ margin: "15px", marginBottom: 0, width: "100%" }}
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
              </Grid>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginRight: 40,
                  marginTop: 15,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
}


export default Adddata;