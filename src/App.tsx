import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './App.css';
import {Login} from "./components/Login";
import {Signup} from "./components/Signup";
import {Main} from "./components/main/Main";
import {Navbar} from "./components/Navbar";
import {Createpost} from "./components/Create-post/Createpost"
function App() {
  return (
    <div className="App">
     <Router>
     <Navbar />
     <Routes>
      <Route path='/' element={<Main />}>Home</Route>
      <Route path='/Login' element={<Login />}>Home</Route>
      <Route path='/Signup' element={<Signup />}>Home</Route>
      <Route path='/Createpost' element={<Createpost/>}>Home</Route>
     </Routes>
     </Router>
    </div>
  );
}
export default App;
