import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from "./logo.png"

class NavBar extends Component{
    render() {
    return(
        <div>
              <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <a class="navbar-brand" href="#"> <b>cryptoBROKE.rs</b>
                </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav">
            <li class="nav-item active">
            <a class="nav-link" href="/"> Home </a>
              </li>
              <li class="nav-item active">
              <a class="nav-link" href="/about"> About </a>
              </li>
              <li class="nav-item">
              <a class="nav-link" href="/login"> Login </a>
              </li>
            </ul>
          </div>
          <img src={Logo} width="135" height="50" class="pull-right" alt=""></img>
        </nav>
        </div>
    )
}
}
export default NavBar;