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
import dayjs from 'dayjs';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../Layouts/Themesetup/index';
import {GetApp, FileUpload} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
import { postStudent, updateBusfees, loading, toast } from '../../actions/student';
import { prevPaymentStudent } from '../../actions/payment';



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

const Adddata = ({button, data, currentId}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
  setOpen(false);
  };

  const dispatch = useDispatch();

  const updatePost = useSelector ((state) => currentId ? state.busfees.busfees.find((p) => p._id === currentId ) : null );


  const [date, setDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));

  const handleDate = (newValue) =>{
    setDate(newValue)
    if(newValue){
      formik.setFieldValue("payedOn", newValue.format('YYYY-MM-DD'));
    }
  }

      useEffect(()=>{
          formik.setFieldValue('studentUuid', currentId);
          formik.setFieldValue('feesPaid', data);
          if(date){
          formik.setFieldValue('payedOn',  date);
          }
      },[open])



  const formik = useFormik({
    initialValues: {
      studentUuid: '',
      feesPaid: 0,
      payedOn: '',
    },
    // validationSchema: Yup.object().shape({
    //   studentId: Yup.string()
    //     .required('Required'),
    //  name: Yup.string()
    //     .required('Required'),
    //  mobileNumber: Yup.number()
    //     .required('Required'),
    // adharNumber: Yup.number()
    //     .required('Required'),
    // email: Yup.string()
    //     .required('Required'), 
    // dob: Yup.string()
    //     .required('Required'),
    // className: Yup.string()
    //     .required('Required'),
    // sectionName: Yup.string()
    //     .required('Required'),
    // busNumber: Yup.string()
    //     .required('Required'),
    // }),
    onSubmit: values => {
      console.log("vasanth", values);
      dispatch(prevPaymentStudent(values));
      formik.resetForm();
      handleClose();
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
        <Button onClick={handleOpen} variant="contained" size="medium" color='buttoncolor' sx={{color: '#fff'}}>
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
                <Grid item xs={12} md={6}>
                  <TextField
                    sx={{
                      "&.MuiTextField-root": {
                        margin: "15px",
                        marginBottom: 0,
                        width: "100%",
                      },
                    }}
                    type="number"
                    name="feesPaid"
                    label="Fees Paid"
                    value={formik.values.feesPaid}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.feesPaid&& formik.errors.feesPaid? (
                    <div style={{ marginLeft: "15px", color: "red" }}>
                      {formik.errors.feesPaid}
                    </div>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      name="payedOn"
                      label="Payment Date"
                      inputFormat="DD-MM-YYYY"
                      value={date}
                      onChange={(newValue) => {
                        handleDate(newValue)
                      }}
                      renderInput={(params) => <TextField sx={{
                        "&.MuiTextField-root": {
                          margin: 0,
                          width: "100%",
                        },
                      }} {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
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