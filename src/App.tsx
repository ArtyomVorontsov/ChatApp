import React, { useState, FormEvent } from 'react';
import './styles/index.scss';
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import Register from './Pages/Register';
import ApolloProvider from './ApoloProvider';
import { BrowserRouter as Router, Route, } from "react-router-dom";
import Switch from 'react-bootstrap/esm/Switch';
import Login from './Pages/Login';
import Home from './Pages/Home';
import { ContextProvider } from "./context/ContextProvider";
import AuthRoute from './util/authRoute';
import classes from "./App.module.css";
import NavBar from './Pages/NavBar';

function App() {

  return (
    <ApolloProvider>
      <ContextProvider>
        <Router>
            <div id="App" className={classes.App} >
              {/* <NavBar/> */}
              <Switch>
                <Route path="/" exact render={() => <AuthRoute authenticated={true} ><Home /></AuthRoute>} />
                <Route path="/register" render={() => <AuthRoute authenticated={false}><Register /></AuthRoute>} />
                <Route path="/login" render={() => <AuthRoute authenticated={false}><Login /></AuthRoute>} />
              </Switch>
            </div>
        </Router>
      </ContextProvider>
    </ApolloProvider>
  );
}

export default App;
