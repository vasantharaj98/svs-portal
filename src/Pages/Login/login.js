import React, {useContext, useState, useEffect} from 'react';
import {Box, Paper, Typography, TextField, Grid, Button, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../actions/auth';
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';
import Loader from '../../Components/Loader/loader'

const Login = () => {

  const showStatus = useSelector((state)=> state.login);

  console.log("showStatus", showStatus);

  const {auth, setAuth } = useContext(AuthContext);

    const [value, setValue] = useState({userName:'', password:''});
    const [showpassword, setShowpassword] = useState(false);
    const [loader, setLoader] = useState(false);
    const [status, setStatus] = useState(false);
    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    useEffect(()=>{
        if(auth?.data){
          navigate(from, {replace: true});
          }
    },[from])

    const handleSubmit=(e)=>{
        e.preventDefault();
        setLoader(true);
        dispatch(signIn(value));
        axios.post('http://3.110.146.2/login', value).then((res) => 
        {
        localStorage.setItem("login",JSON.stringify(res.data));
        setAuth(res.data);
        if(auth){
          setLoader(false);
          setValue({userName:'', password:''});
          setShowpassword(false);
        }
        navigate(from, {replace : true});
        }
        )
        axios.post('http://3.110.146.2/login', value).catch((e)=>{
          if(e){
            setLoader(false);
            setStatus(true);
          }
        })
    };

    const handleClickShowPassword = () => {
        setShowpassword(!showpassword);
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

  return (
    <>
    {loader && <Loader></Loader>}
    <Box
      sx={{
        display: "flex",
        paddingTop: 10,
        "& > :not(style)": {
          m: "auto",
          p: 2,
        },
      }}
    >
      <Paper variant="outlined">
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          SRV School
        </Typography>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", marginTop: 1, marginBottom: 1 }}
        >
          Login
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "35ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Grid container>
            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <TextField
                type="text"
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={value.userName}
                onChange={(e) =>
                  setValue({ ...value, userName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <FormControl sx={{ width: "100%" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showpassword ? "text" : "password"}
                  value={value.password}
                  onChange={(e) =>
                    setValue({ ...value, password: e.target.value })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showpassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 3 }}>
              <Button
                type="submit"
                sx={{ width: "100%" }}
                variant="contained"
                size="large"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
        {status && <Typography sx={{textAlign: 'center', marginTop: 3, color:"red"}} variant="h5">Invalid Credential!</Typography>}
      </Paper>
    </Box>
    </>
  );
}

export default Login;