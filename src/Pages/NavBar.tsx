import React, { useState, useContext } from 'react'
import { Container, Row, Button, Modal } from 'react-bootstrap'
import ReactDOM from "react-dom";
import classes from './NavBarStyles/NavBarStyles.module.css';
import { DispatchContext, StateContext } from '../context/ContextProvider';
import { logoutAC } from '../context/Actions';
export default function NavBar() {

    const dispatch = useContext(DispatchContext);

    const [isOpen, setState] = useState(false);
    const App = document.getElementById("App");

    const openHandler = () => {
        isOpen ? setState(false) : setState(true)
    }

    const logoutHandler = () => {
        localStorage.removeItem("token");
        //@ts-ignore
        dispatch(logoutAC());
        window.location.href = "/login"
    }

    return (
        <Container className="mb-1">
            <Row className=" pl-3 flex-direction-row justify-content-start align-items-center bg-white ">
                <Row>
                    <button onClick={() => { openHandler() }}>Settings</button>
                    {
                        isOpen ?
                            ReactDOM.createPortal(
                                
                                    <Modal.Dialog size="lg" style={{ position: "absolute", 
                                    transform: "translate(-50%, -50%)", 
                                    top:"40%", left: "50%", zIndex: 10,
                                    width: "500px"  }} >
                                        <Modal.Header>
                                            <Modal.Title>Settings</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Button onClick={logoutHandler} variant="danger">
                                                Logout
                                            </Button>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={openHandler}>
                                                Close modal
                                            </Button>
                                        </Modal.Footer>
                                    </Modal.Dialog>
                              
                                , App!) : null
                    }
                </Row>
            </Row>

        </Container>

    )
}
