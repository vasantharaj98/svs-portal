import React from "react";
import Header from "./Layouts/Header/index.js"
import School from "./Pages/School/Index.js";
import Bus from "./Pages/Bus/index.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Header></Header>
      <Routes>
        <Route path='/' element={<School/>} exact></Route>
        <Route path="/bus" element={<Bus/>} exact></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
