import React from 'react';
import '../styles/index.scss';
import UsersMenu from './components/UsersMenu/UsersMenu';
import ChatMenuContainer from './components/ChatMenu/ChatMenuContainer';
import UsersMenuContainer from './components/UsersMenu/UsersMenuContainer';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './HomeStyles/Home.module.css';
import NavBar from './NavBar';


function Home(props: any) {

  return (
    <div className={classes.home}>
      <Container className={"h-100"}>
        <NavBar />
        <Container className={"d-flex p-0 h-100"}>
          <Col xs={3} className={"d-flex p-0"}>
            <UsersMenuContainer />
          </Col>
          <Col className={"d-flex h-100 p-0 m-0"}>
            <ChatMenuContainer />
          </Col>
        </Container>

      </Container>
    </div>

  )
}

export default Home;
