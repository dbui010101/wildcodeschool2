import React, {Fragment} from "react"
import "./index.css"
import { useForm } from 'react-hook-form';
import { BrowserRouter as Router, Switch, Route, Link,useLocation } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Contact from './components/Contact';
import Inscription from './components/Inscription';
import Espace_membre from './components/Espace_membre';
const axios = require('axios');

// npm start
export default function App() {
  return (
    <Router>
        <div>
          <h2>Welcome to React Router Tutorial</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/contact'} className="nav-link">Contact</Link></li>
            <li><Link to={'/login'} className="nav-link">Login</Link></li>
            <li><Link to={'/inscription'} className="nav-link">Inscription</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/contact' component={Contact} />
              <Route path='/login' component={Login} />
              <Route path='/inscription' component={Inscription} />
              <Route path='/:name' component={Espace_membre} />
          </Switch>
        </div>
      </Router>   
    
  );
}