import React, {useState, useEffect, useContext} from "react";
import Header from "./Layouts/Header/index.js"
import Class from "./Pages/Class/index.js";
import Bus from "./Pages/Bus/index.js";
import Discount from "./Pages/Discount/index.js";
import Student from "./Pages/Student/index.js"
import Fees from "./Pages/Fees/index.js";
import Year from "./Pages/Year/index"
import Login from "./Pages/Login/login";
import Auth from "./Auth/Auth.js";
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { getBusfees, loading, toast } from './actions/busfees';
import { getYear } from './actions/year'
import { useDispatch} from 'react-redux';
import AuthContext from "./context/AuthProvider.js";
import { getClass } from "./actions/class.js";
import { getDiscount } from "./actions/discount"
import { getFees } from "./actions/fees.js";
import { getStudent } from "./actions/student.js";

function App() {

  const {auth, setAuth} = useContext(AuthContext);
  
  const [currentId, setCurrentid] = useState(null);

  const [vchange, setVchange] = useState(false);

  const [year, setYear] = useState("2022");

  const dispatch = useDispatch();

  useEffect(()=>{
    setAuth(JSON.parse(localStorage.getItem('login')))
  },[])

  useEffect(()=>{
        dispatch(getDiscount());
        dispatch(getClass());
        dispatch(getYear());
        dispatch(getFees(year));
        dispatch(getBusfees(year));
        dispatch(getStudent(year));
        dispatch(loading(false));
        dispatch(toast(false));
  },[dispatch, vchange, auth]);

  return (
    <div className="App">
      <Router>
      {auth?.data && <Header auth={auth} ></Header>}
      <Routes>
        <Route path='/login' element={auth?.data ? <Navigate to="/"/> : <Login/>}></Route>
        <Route element={<Auth auth={auth} />}>
        <Route path='/'element={<Student year={year} setYear={setYear} vchange={vchange} setVchange={setVchange} currentId={currentId} setCurrentid={setCurrentid}/>} exact></Route>
        <Route path='/academicyear' element={<Year vchange={vchange} setVchange={setVchange}/>} ></Route>
        <Route path='/busfees'  element={<Bus year={year} setYear={setYear} vchange={vchange} setVchange={setVchange} currentId={currentId} setCurrentid={setCurrentid}/>} ></Route>
        <Route path='/class' element={<Class vchange={vchange} setVchange={setVchange}/>} ></Route>
        <Route path='/discount' element={<Discount vchange={vchange} setVchange={setVchange}/>} ></Route>
        <Route path='/academic_fees' element={<Fees year={year} setYear={setYear} vchange={vchange} setVchange={setVchange}/>} ></Route>
        </Route>        
      </Routes>
      </Router>
    </div>
  );
}

export default App;
