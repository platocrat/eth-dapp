import React, { Component } from 'react'
import logo from './logo.svg';
import Home from "./Home"
import About from "./About"
import Login from "./Login"
import NavBar from "./NavBar"
import Member from "./Member"
import CampaignDetails from "./CampaignDetails"
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Link, Switch} from "react-router-dom"
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import Signup from './Signup';
import Logout from './Logout';
const color="#F9F3F3";

export const client = new ApolloClient({
    link: new HttpLink({
      uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    }),
    cache: new InMemoryCache(),
  });
function App() {
  return (
    <div>
    <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/about" component={About} />
      <Route exact path="/member" component={Member} />
      <Route exact path="/logout" component={Logout} />
    </Switch>
    </BrowserRouter>

</div>
  );
}

export default App;

