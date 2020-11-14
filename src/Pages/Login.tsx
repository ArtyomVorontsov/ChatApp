import React, { useState, useContext } from 'react';
import '../styles/index.scss';
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { gql, ApolloError, useLazyQuery } from '@apollo/client';
import { withRouter, Link } from 'react-router-dom';
import { StateContext, DispatchContext } from '../context/ContextProvider';
import { loginAC } from '../context/Actions';
function Login(props: any) {

  type LoginVariablesType = {
    email: string
    password: string
  }

  const dispatch = useContext(DispatchContext);

  const [errors, setErrors] = useState({
    email: null as null | string,
    password: null as null | string
  })

  const [variables, setVariables] = useState({
    email: "",
    password: ""
  } as LoginVariablesType)

  let LOGIN = gql`
    query login($email: String!, $password: String! ){
      login(email: $email, password: $password){
          token
          username
          createdAt
      }
    }
  `

  let [login, date] = useLazyQuery(LOGIN, {
    onError(err: ApolloError) {

    },
    onCompleted(loginData) {
      
      let newErrors = { ...errors }
      //@ts-ignore
      if (date.variables.email.trim() === "") {
        newErrors.email = "Must not be empty";
        
      }

      //@ts-ignore
      if (date.variables.password.trim() === "") {
        newErrors.password = "Must not be empty";
        
      }
      setErrors(newErrors);

      if(variables.email.trim() !== "" && variables.password.trim() !== ""){
          
          //@ts-ignore
          dispatch(loginAC({username: loginData.login.username, token: loginData.login.token}));
          window.location.href = "/";
      }
    }
  })

  const inputHandle: (field: "password" | "email", e: any) => void = (field, e) => {
    let clearErrors = {...errors};
    clearErrors[field] = null;
    setErrors(clearErrors);
    let newVariables: LoginVariablesType = { ...variables };
    newVariables[field] = e.target.value;
    setVariables(newVariables);

  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    login({ variables });
  }


  return (

    <div>
      <Container>
        <Row lg={3} md={2} sm={7} xs={12} className="justify-content-center">
          <Col>
            <h2 className="text-center">Login page</h2>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>{errors.email ? errors.email : "Email address"}</Form.Label>
                <Form.Control isInvalid={errors.email ? true : false} value={variables.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandle("email", e)} type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>{errors.password ? errors.password : "Password"}</Form.Label>
                <Form.Control isInvalid={errors.password ? true : false} value={variables.password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandle("password", e)} type="password" placeholder="Enter password" />
              </Form.Group>
              <Row className="justify-content-center align-items-center flex-column">
                <Button onClick={(e) => onSubmit(e)} variant="primary" type="submit">Submit</Button>
                <p>Not have an account? Register <Link to="/register">here</Link> </p>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>

    </div>

  );
}

export default withRouter(Login);
