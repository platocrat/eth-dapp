import React, { useState, useEffect } from 'react';
import styles from "./Login.css"
import jQuery from 'jquery';
import Web3 from 'web3';



const LoginForm = () => {
  let web3;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLogin] = useState(false);
  const onLoggedIn = (auth) => {console.log("success");
   setLogin(true);
   window.location.replace('http://localhost:3000/member');
   return 0};
  let REACT_APP_BACKEND_URL="http://localhost:8000/api";
  const handleClick = async () => {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      window.alert('Please install MetaMask first.');
      return;
    }
  
    if (true) {
      try {
        // Request account access if needed
        await window.ethereum.enable();
  
        // We don't know window.web3 version, so we use our own instance of Web3
        // with the injected provider given by MetaMask
        web3 = new Web3((window).ethereum);
        console.log(web3,"true")
      } catch (error) {
        window.alert('You need to allow MetaMask.');
        return;
      }
    }
  
    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert('Please activate MetaMask first.');
      return;
    }
    
    const publicAddress = coinbase.toLowerCase();
    setLoading(true);
    // Look if user with current publicAddress is already present on backend
    fetch(
      `${REACT_APP_BACKEND_URL}/users?publicAddress=${publicAddress}`
    )
      .then((response) => response.json())
      // If yes, retrieve it. If no, create it.
      .then((users) => 
        users.length ? users[0] : handleSignup(publicAddress)
      )
      // Popup MetaMask confirmation modal to sign message
      .then(handleSignMessage)
      // Send signature to backend on the /auth route
      .then(handleAuthenticate)
      // Pass accessToken back to parent component (to save it in localStorage)
      .then(onLoggedIn)
      .catch((err) => {
        window.alert(err);
        setLoading(false);
      });
  }
  const handleAuthenticate = (
		signAddress) =>{
    console.log(signAddress);
    var publicAddress = signAddress.address;
    var signature = signAddress.signature;
    console.log(publicAddress);
    console.log(signature);
		fetch(`${REACT_APP_BACKEND_URL}/auth`, {
			body: JSON.stringify({publicAddress, signature}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		}).then((response) => response.json());}
  const handleSignMessage = async (
		publicAddress) => {
		try {
			const signature = await web3.eth.personal.sign(
				`I am signing my one-time nonce: ${publicAddress.nonce}`,
				publicAddress.publicAddress,
				'' // MetaMask will ignore the password argument here
			);
      var address = publicAddress.publicAddress;
      //var sign = signature.signature;
      console.log(address);
      console.log(signature);
			return {address, signature};
		} catch (err) {
			throw new Error(
				'You need to sign the message to be able to log in.'
			);
		}
	};
  const handleSignup = (publicAddress) =>
		fetch(`${REACT_APP_BACKEND_URL}/users`, {
			body: JSON.stringify({ publicAddress }),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		}).then((response) => response.json());
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      window.location.replace('http://localhost:3000/dashboard');
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    const user = {
      email: email,
      password: password
    };

    fetch('http://127.0.0.1:8000/api/v1/users/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.key) {
          localStorage.clear();
          localStorage.setItem('token', data.key);
          window.location.replace('http://localhost:3000/dashboard');
        } else {
          setEmail('');
          setPassword('');
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
<div className="login">
    <div className="outer">
    <div className="inner">
    {loading === false && <h2 className="text-center"><br></br>Login</h2>}
    {errors === true && <h2>Cannot log in with provided credentials</h2>}
    {loading === false && (
      <form onSubmit={onSubmit}>

    <div className="form-group">
    <label htmlFor='email'>Email address:</label>
    <input
          name='email'
          type='email'
          placeholder="Enter your email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          className="form-control"
        />{' '}
    </div>

    <div className="form-group mt-2">
      <label htmlFor='password'>Password:</label>
      <input
          name='password'
          type='password'
          placeholder="Enter your password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          className="form-control"
        />{' '}
    </div>

    <div className="col text-center">
        <button type="submit" className="btn btn-dark btn-lg btn-block mt-3">Submit</button>
    </div>
    <div className="col text-center">
    <button className="btn btn-warning btn-lg btn-block mt-3" onClick={handleClick}>
				{loading ? 'Loading...' : 'Login with MetaMask'}
			</button>
      </div>
</form>
)}
</div>
</div>
</div>
);
};

export default LoginForm;