import React, { useContext} from 'react';
import { Navigate, useLocation, Outlet} from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const Auth = () => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();
    
  return (
    auth?.data
    ? <Outlet/>
: !auth && <Navigate to='/login' state={{from: location}} replace></Navigate>
  )
}

export default Auth;