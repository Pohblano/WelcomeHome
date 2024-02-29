// Styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
// Components
import React, { useState, setState, useEffect } from "react";
import MainNav from "./Components/MainNav.js";
import Welcome from "./Components/Welcome.js";
import SignUp from "./Components/SignUp.js";
import Login from "./Components/Login.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import useToken from './Components/Utils/UseToken.js';
import Dashboard from './Components/Dashboard.js';



function App() {
  const { token, setToken, deleteToken } = useToken();

  return (

    // <Container fluid className="p-0">
    <div>
      {
        (token) ? (
            <Router>
              <Routes>
                <Route path="/" exact element={<Dashboard token={token} deleteToken={deleteToken}/>} />
              </Routes>
            </Router>
        ) : (
          <Router>
            <Routes>
              <Route path="/" exact Component={Welcome} />
              <Route path="/login" exact element={<Login setToken={setToken} oldToken={token} />} />
              <Route path="/sign-up" exact Component={SignUp} />
            </Routes>
          </Router>
        )
      }
{/* </Container> */}
</div>
  );
}

export default App;


{/* <MainNav token={token} />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/sign-up" exact Component={SignUp} />
          {
            (!token)?
              (<Route path="/login" exact element={<Login setToken={setToken} setUserToken={setUserToken} />} />)
              : null
          }
          <Route path="/login" exact element={<Login setToken={setToken} />} />
          <PrivateRoute path="/dashboard" component={Dashboard} isLoggedIn={isLoggedIn} />
        </Routes> */}

//   <Router>
//   <Link to="/">Home</Link>
//   <Link to="/About">About</Link>
//   <Routes>
//     <Route path={"/"} exact element={<div>Home Page</div>} />
//     <Route path={"/About"} exact element={<div>About Page</div>} />
//   </Routes>
// </Router>