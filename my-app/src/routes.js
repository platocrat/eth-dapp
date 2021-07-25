import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Import all page components here
 */
import App from './App';
import About from './About';
//import Login from './Login';
//import SomeOtherPage from './components/SomeOtherPage';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={About} />
  </Route>
);

//<Route path="/some/where" component={SomePage} />
//<Route path="/some/otherpage" component={SomeOtherPage} />