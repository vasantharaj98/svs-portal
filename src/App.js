import React, {useState, useEffect, useContext} from "react";
import Header from "./Layouts/Header/index.js"
import Class from "./Pages/Class/index.js";
import Bus from "./Pages/Bus/index.js";
import Discount from "./Pages/Discount/index.js";
import Student from "./Pages/Student/index.js"
import Fees from "./Pages/Fees/index.js";
import Login from "./Pages/Login/login";
import Auth from "./Auth/Auth.js";
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { getBusfees, loading, toast } from './actions/busfees';
import { useDispatch} from 'react-redux';
import AuthContext from "./context/AuthProvider.js";

function App() {

  const {auth, setAuth} = useContext(AuthContext);
  
  const [currentId, setCurrentid] = useState(null);

  const dispatch = useDispatch();

  useEffect(()=>{
    setAuth(JSON.parse(localStorage.getItem('login')))
  },[])

  useEffect(()=>{
        dispatch(getBusfees());
        dispatch( loading(false));
        dispatch(toast(false));
  },[dispatch]);

  return (
    <div className="App">
      <Router>
      {auth?.data && <Header auth={auth} setAuth={setAuth}></Header>}
      <Routes>
        <Route path='/login' element={auth?.data ? <Navigate to="/"/> : <Login/>}></Route>
        <Route element={<Auth auth={auth}/>}>
        <Route path='/'element={<Student/>} exact></Route>
        <Route path='/busfees'  element={<Bus currentId={currentId} setCurrentid={setCurrentid}/>} ></Route>
        <Route path='/class' element={<Class/>} ></Route>
        <Route path='/discount' element={<Discount/>} ></Route>
        <Route path='/academic_fees' element={<Fees/>} ></Route>
        </Route>        
      </Routes>
      </Router>
    </div>
  );
}

export default App;
