import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import Home from "./Home"
import About from "./About"
import Login from "./Login"
import NavBar from "./NavBar"
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Link} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/about" component={About} />
    </BrowserRouter>
  );
}

export default App;