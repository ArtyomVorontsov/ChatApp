import React from 'react';
import '../styles/index.scss';
import UsersMenu from './components/UsersMenu/UsersMenu';
import ChatMenuContainer from './components/ChatMenu/ChatMenuContainer';
import UsersMenuContainer from './components/UsersMenu/UsersMenuContainer';
import { Container, Row } from 'react-bootstrap';
import classes from './HomeStyles/Home.module.css';
import NavBar from './NavBar';


function Home(props: any) {

  return (
    <Container>
      <NavBar/>
      <div className={classes.home}>
        <div className={classes.usersMenuWrapper}>
          <UsersMenuContainer />
        </div>
        <div className={classes.chatMenuWrapper}>
          <ChatMenuContainer />
        </div>
      </div>
    </Container>
  )
}

export default Home;
