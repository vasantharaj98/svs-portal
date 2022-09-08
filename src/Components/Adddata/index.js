// import React, {useState} from 'react';
// import Backdrop from '@mui/material/Backdrop';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Modal from '@mui/material/Modal';
// import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
// import { ThemeProvider } from '@mui/material/styles';
// import { theme } from '../../Layouts/Themesetup/index';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 2,
// };

// const Adddata = (props) => {
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <ThemeProvider theme={theme}>
//       <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 15}}>
//       <Button onClick={handleOpen} variant="contained" color='primary'>{props.button}</Button>
//       </div> 
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={open}>
//           <Box sx={style}>
//           <Box
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 2, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <div>
//         <TextField
//           required
//           id="outlined-required"
//           label="School Name"
          
//         />
//         <TextField
//           disabled
//           id="outlined-disabled"
//           label="Disabled"
//           defaultValue="Hello World"
          
//         />
//         <TextField
//           id="outlined-password-input"
//           label="Password"
//           type="password"
//           autoComplete="current-password"
          
//         />
//         <TextField
//           id="outlined-read-only-input"
//           label="Read Only"
//           defaultValue="Hello World"
          
//           InputProps={{
//             readOnly: true,
//           }}
//         />
//         <TextField
//           id="outlined-number"
//           label="Number"
//           type="number"
          
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//         <TextField id="outlined-search" label="Search field"  type="search" />
//       </div>
//       <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: 40, marginTop: 15}}>
//         <Button variant="contained" color='primary' size="large">Submit</Button>
//       </div> 
//       </Box>
//           </Box>
//         </Fade>
//       </Modal>
//     </ThemeProvider>
//   );
// }


// export default Adddata;