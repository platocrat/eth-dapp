import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from "./logo.png"

class About extends Component{
    render(){
        return (
            <div id="content" className="mt-5">
            <div>
                <div></div>
                <h5  class="text-center"> CryptoBROKE.rs is a team of young software developers and crypto enthusiasts. </h5>
                <div></div>
                <div class="text-center"><img src={Logo} width="150" height="60" class="center" alt=""></img></div>
            </div>
            </div>
        )
    }
}
export default About;