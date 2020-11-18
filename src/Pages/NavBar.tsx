import React, { useState, useContext } from 'react'
import { Container, Row, Button, Modal } from 'react-bootstrap'
import ReactDOM from "react-dom";
import classes from './NavBarStyles/NavBarStyles.module.css';
import { DispatchContext, StateContext } from '../context/ContextProvider';
import { logoutAC } from '../context/Actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from "@fortawesome/free-solid-svg-icons"


type propsType = {

}


 const NavBar:React.FC<propsType> = (props) => {

    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);

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
            <Row className=" pl-3 flex-direction-row justify-content-start align-items-center bg-#222831 ">
                <Row>
                    <button className={"border-0 bg-transparent"} onClick={() => { openHandler() }}>
                        <FontAwesomeIcon icon={faCog} color={"white"} size={"lg"} />
                    </button>
                    {
                        isOpen ?
                            ReactDOM.createPortal(

                                <Modal.Dialog size="xl" style={{
                                    position: "absolute",
                                    transform: "translate(-50%, -50%)",
                                    top: "40%", left: "50%", zIndex: 10,
                                    width: "500px"
                                }} >
                                    <Modal.Header className={classes.modalBody}>
                                        <Modal.Title className={"text-white"}>Settings</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className={classes.modalBody}>
                                        <div className={classes.accountSection}>
                                            <div className={classes.userPicWrapper}>
                                                <div className={classes.userPic}>

                                                </div>
                                            </div>
                                            <h2 className={"text-white"}>{state.user.username}</h2>
                                        </div>

                                        <Button onClick={logoutHandler} variant="danger">
                                            Logout
                                        </Button>
                                    </Modal.Body>
                                    <Modal.Footer className={classes.modalBody}>
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


export default NavBar;