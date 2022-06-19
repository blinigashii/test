import logo from './logo.svg';
import './App.css';
import {Department} from './Department';
import {BrowserRouter, Route, Routes,NavLink} from 'react-router-dom';
import { Events } from './Events';
import { Holidays } from './Holidays';
import { Unit } from './Unit';
import {EmergencyContact} from './EmergencyContact';
import { Tasks } from './Tasks';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        CRUD Forms
      </h3>
        
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="./Department">
            Departments
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="./Events">
            Events
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="./Holidays">
            Holidays
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="./Unit">
            Units
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="./EmergencyContact">
            Emergency Contact
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="./Tasks">
            Tasks
            </NavLink>
          </li>
          
          <li className="nav-item- m-1">
          </li>
        </ul>
      </nav>
        <Route path='/Department' component={Department}/>
        <Route path='/Events' component={Events}/>
        <Route path='/Holidays' component={Holidays}/>
        <Route path='/Unit' component={Unit}/>
        <Route path='/EmergencyContact' component={EmergencyContact}/>
        <Route path='/Tasks' component={Tasks}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
