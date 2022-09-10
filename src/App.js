import React, {useState, useEffect} from "react";
import Header from "./Layouts/Header/index.js"
import Class from "./Pages/School/Index.js";
import Bus from "./Pages/Bus/index.js";
import Student from "./Pages/Student/Index.js";
import Fees from "./Pages/Fees/Index.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getBusfees, loading, toast } from './actions/busfees';
import { useDispatch} from 'react-redux';

function App() {

  const [currentId, setCurrentid] = useState(null);

  const dispatch = useDispatch();

  useEffect(()=>{
        dispatch(getBusfees());
        dispatch( loading(true));
        dispatch(toast(false));
  },[dispatch]);

  return (
    <div className="App">
      <Router>
      <Header></Header>
      <Routes>
        <Route path='/'  element={<Bus currentId={currentId} setCurrentid={setCurrentid}/>} exact></Route>
        {/* <Route path='/class' element={<Class/>} ></Route>
        <Route path='/academic_fees' element={<Fees/>} ></Route>
        <Route path='/student' element={<Student/>} ></Route>
        <Route path='/test' element={<Student/>} ></Route> */}
      </Routes>
      </Router>
    </div>
  );
}

export default App;
