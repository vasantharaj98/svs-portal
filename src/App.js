import React from "react";
import Header from "./Layouts/Header/index.js"
import Class from "./Pages/School/Index.js";
import Bus from "./Pages/Bus/index.js";
import Student from "./Pages/Student/Index.js";
import Fees from "./Pages/Fees/Index.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Bus/>} exact></Route>
        <Route path='/class' element={<Class/>} ></Route>
        <Route path='/academic_fees' element={<Fees/>} ></Route>
        <Route path='/student' element={<Student/>} ></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
