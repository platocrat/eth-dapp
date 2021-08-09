import React, { useState, useEffect } from 'react';
import {Input} from 'reactstrap'
import styles from "./Login"


const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

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
      organisation: organisation,
      username: username,
      email: email,
      password1: password1,
      password2: password2
    };

    fetch('http://127.0.0.1:8000/api/v1/users/auth/register/', {
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
          setOrganisation('');
          setEmail('');
          setUsername('');
          setPassword1('');
          setPassword2('');
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <div className="login">
    <div className="outer">
    <div className="inner">
      {loading === false && <h2 className="text-center"><br></br>Signup</h2>}
      {errors === true && <h3 color="red">Cannot signup with provided credentials</h3>}
      <form onSubmit={onSubmit}>
      <div className="form-group mt-4">
        <label for="exampleSelect">Organisation:</label>
        <input
        name='organisation'
        type='organisation'
        placeholder='Enter your organisation'
        className="form-control"
        value={organisation}
        onChange={e => setOrganisation(e.target.value)}
        required
      />{' '}
      </div>
      <div className="form-group mt-2">
        <label>Username:</label>
        <input
          name='usename'
          type='username'
          placeholder='Enter your username'
          className="form-control"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />{' '}
        </div>
        <div className="form-group mt-2">
        <label>Email address:</label>
        <input
          name='email'
          type='email'
          placeholder='Enter your email'
          className="form-control"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />{' '}
        </div>
        <div className="form-group mt-2">
        <label htmlFor='password1'>Password:</label>
        <input
          className="form-control"
          name='password1'
          placeholder='Enter you password'
          type='text'
          value={password1}
          onChange={e => setPassword1(e.target.value)}
          required
        />{' '}
        </div>
        <div className="form-group mt-2">
        <label htmlFor='password2'>Confirm password:</label>
        <input
          name='password2'
          type='password'
          placeholder='Repeat your password'
          className="form-control"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          required
        />{' '}
        </div>
        <div className="col text-center">
        <button type="submit" className="btn btn-dark btn-lg btn-block mt-3">Register</button>
        <p className="forgot-password text-right">
            Already registered <a href="/login">log in?</a>
        </p>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
};
export default Signup;