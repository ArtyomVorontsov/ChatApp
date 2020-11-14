import React, { useState, useContext } from 'react';
import '../styles/index.scss';
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { gql, ApolloError, useLazyQuery } from '@apollo/client';
import { withRouter, Link } from 'react-router-dom';
import { StateContext, DispatchContext } from '../context/ContextProvider';

function Login(props: any) {
  const userState = useContext(StateContext);
  const userDispatch = useContext(DispatchContext);
  console.log(userState);
  type ErrorDataType = {
    email?: string | null,
    password?: string | null,
  }

  const formData: any = {
    email: "",
    password: "",
  }

  const [variables, setState] = useState(formData);


  const LOGIN = gql`query 
    loginUser($password: String!, $email: String!){
        login( password: $password, email: $email){
          token
          username
          createdAt
      }
    }`


  const errorData: ErrorDataType = {
    email: null,
    password: null,
  }

  const [errors, setErrors] = useState(errorData);

  const [loginUser, { loading, data }] = useLazyQuery(LOGIN, {
    onCompleted(data){
      
    },
    onError(err: ApolloError) {
      debugger
      let errorMessages = err.graphQLErrors[0].extensions!.exception!.errors;
      setErrors(errorMessages);
      console.log(err.graphQLErrors[0].extensions!.exception!.errors);
      
    }
  });


  
  //Data finish fetching
  if (data) {
    if (data.login === null) {
      
      
      
    } else {
      localStorage.setItem("token", data.login.token);
      props.history.push("/");
      //@ts-ignore
      userDispatch({ type: "LOGIN", username: "John", token: data.login.token })
    }
  }

  const inputHandle = (field: string, data: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...variables,
      [field]: data.target.value
    })
  }

  const onSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    let submitData: any = { variables };
    console.log(submitData);
    loginUser(submitData);
  };

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
                <Button  onClick={(e) => onSubmit(e)} variant="primary" type="submit">Submit</Button>
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
