import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from "./NavBar"

const Login = () => {
	return (
		<div class="container-fluid">
			<NavBar />
		<div class="row">
			<div class="col-md-12">
				<div class="alert alert-dismissable alert-danger">
					 
					<button type="button" class="close" data-dismiss="alert" aria-hidden="true">
						×
					</button>
					<h4>
						Alert!
					</h4> <strong>Warning!</strong> Best check yo self, you're not looking too good. <a href="#" class="alert-link">alert link</a>
				</div>
				<div class="dropdown">
					 
					<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">
						Action
					</button>
					<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
						 <a class="dropdown-item disabled" href="#">Action</a> <a class="dropdown-item" href="#">Another action</a> <a class="dropdown-item" href="#">Something else here</a>
					</div>
				</div>
				<form role="form">
					<div class="form-group">
						 
						<label for="exampleInputEmail1">
							Email address
						</label>
						<input type="email" class="form-control" id="exampleInputEmail1" />
					</div>
					<div class="form-group">
						 
						<label for="exampleInputPassword1">
							Password
						</label>
						<input type="password" class="form-control" id="exampleInputPassword1" />
					</div>
					<div class="form-group">
						 
						<label for="exampleInputFile">
							File input
						</label>
						<input type="file" class="form-control-file" id="exampleInputFile" />
						<p class="help-block">
							Example block-level help text here.
						</p>
					</div>
					<div class="checkbox">
						 
						<label>
							<input type="checkbox" /> Check me out
						</label>
					</div> 
					<button type="submit" class="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		</div>
	</div>
	)
}

export default Login;