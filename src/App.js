import React, {useState, useEffect} from "react";
import Header from "./Layouts/Header/index.js"
import Class from "./Pages/Class/index.js";
import Bus from "./Pages/Bus/index.js";
import Discount from "./Pages/Discount/index.js";
import Student from "./Pages/Student/Index.js";
import Fees from "./Pages/Fees/index.js";
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
        <Route path='/'element={<Class/>}   exact></Route>
        <Route path='/busfees'  element={<Bus currentId={currentId} setCurrentid={setCurrentid}/>} ></Route>
        <Route path='/class' element={<Class/>} ></Route>
        <Route path='/discount' element={<Discount/>} ></Route>
        <Route path='/academic_fees' element={<Fees/>} ></Route>
        {/* <Route path='/setting' element={<Discount/>} ></Route> */}
        {/* <Route path='/test' element={<Student/>} ></Route> */}
      </Routes>
      </Router>
    </div>
  );
}

export default App;
