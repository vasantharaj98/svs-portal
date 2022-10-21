import React, {useState, useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {Autocomplete} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../Layouts/Themesetup/index';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postFees, updateBusfees, loading, toast } from '../../actions/fees';



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

// const top100Films = ['A', 'B'];

const Adddata = ({currentId, setCurrentid, button, vchange, setVchange, year}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
  setOpen(false);
  setCurrentid(null);
  setPostdata({ routename: '' , busno: '', twowayfees: '', fullfees: '', specialtripfees: '', totalfees: '' });
  };


  const [postData, setPostdata ] = useState ({ routename: '' , busno: '', twowayfees: '', fullfees: '', specialtripfees: '', totalfees: '' });


  const dispatch = useDispatch();

  const className = useSelector((state)=> state.classs);

  const top100Films = className?.data.map((ye)=>{
    return ye.className;
 });

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

        // dispatch(postBusfees(postData));
        dispatch(loading(true));
        dispatch(toast(false));

      }
      setPostdata({ routename: '' , busno: '', twowayfees: '', fullfees: '', specialtripfees: '', totalfees: '' });
  }

  const [value, setValue] = useState({className:[]});

  const classValue = value.className.join();

  useEffect(()=>{
    formik.setFieldValue('className', classValue)
    formik.setFieldValue('year', year)
  },[classValue])

  // console.log("valuevalue", classValue);

  const formik = useFormik({
    initialValues: {
      className: '',
      tuitionFees: 0,
      bookFees: 0,
      hasTermFees: true,
      term1: 0,
      term2: 0,
      term3: 0,
      year: ''
    },
    validationSchema: Yup.object({
      tuitionFees: Yup.number()
        .required('Required'),
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
      <div style={{display: 'flex'}}>
      <div>
      <Autocomplete
        multiple
        id="className"
        name="className"
        onChange={(event, newValue) => {
          setValue({className: newValue});
        }}
        options={top100Films}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ '&.MuiTextField-root':{
              
            },
          }}
            label="Select Class Name"
            placeholder="classnames"
            value={formik.values?.className}
          />
        )}
      />
      </div>
      <div>
        <TextField
        sx={{ '&.MuiTextField-root':{
        },
      }}
          type='number'
          name="tuitionFees"
          label="Tuition Fees"
          value={formik.values.tuitionFees}
          onChange= {formik.handleChange}
          onBlur={formik.handleBlur}
        />
         {formik.touched.tuitionFees && formik.errors.tuitionFees  ? (
         <div style={{color: 'red'}}>{formik.errors.tuitionFees}</div>
       ) : null}
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
       </div>
        <FormControlLabel sx={{ marginLeft: 1}} control={<Checkbox name="hasTermFees" defaultChecked onChange= {formik.handleChange} />} label="Term Fees" />

        <div>
        { formik.values.hasTermFees ? 
        <>
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
      </>
      : null}

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