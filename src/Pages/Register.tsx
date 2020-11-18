import React, { useState, FormEvent } from 'react';
import '../styles/index.scss';
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { gql, useMutation, ApolloError } from '@apollo/client';
import { Link } from 'react-router-dom';
import {CREATE_USER} from "../API/API";

type propsType = {

}

const Register:React.FC<propsType> = (props) => {

  type ErrorDataType = {
    email?: string | null,
    username?: string | null,
    password?: string | null,
    comfirmPassword?: string | null
  }

  const formData: any = {
    email: "",
    username: "",
    password: "",
    comfirmPassword: ""
  }

  const [variables, setState] = useState(formData);




  const errorData: ErrorDataType = {
    email: null,
    password: null,
    comfirmPassword: null,
    username: null
  }

  const [errors, setErrors] = useState(errorData);

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    update(_, res) {
      console.log(res)
    },
    onError(err: ApolloError) {
      let errorMessages = err.graphQLErrors[0].extensions!.exception!.errors;
      if (errorMessages.errors !== undefined) {
        let errorField = errorMessages.errors[0].message.split(".")[1].split(" ")[0];
        console.log(errorField);
        setErrors({ [errorField]: `${errorField[0].toUpperCase()}${errorField.slice(1, errorField.length)} must be unique` })
      } else {
        setErrors(errorMessages);
      }
      console.log(err.graphQLErrors[0].extensions!.exception!.errors);
    }
  });




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
    createUser(submitData);
  };

  return (

    <div>
      <Container>
        <Row lg={3} md={2} sm={7} xs={12} className="justify-content-center">
          <Col>
            <h2 className="text-center">Registration page</h2>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>{errors.email ? errors.email : "Email address"}</Form.Label>
                <Form.Control isInvalid={errors.email ? true : false} value={variables.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandle("email", e)} type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group>
                <Form.Label>{errors.username ? errors.username : "Username"}</Form.Label>
                <Form.Control isInvalid={errors.username ? true : false} value={variables.username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandle("username", e)} type="text" placeholder="Enter username" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>{errors.password ? errors.password : "Password"}</Form.Label>
                <Form.Control isInvalid={errors.password ? true : false} value={variables.password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandle("password", e)} type="password" placeholder="Enter password" />
              </Form.Group>
              <Form.Group>
                <Form.Label> {errors.comfirmPassword ? errors.comfirmPassword : "Comfirm password"}</Form.Label>
                <Form.Control isInvalid={errors.comfirmPassword ? true : false} value={variables.comfirmPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputHandle("comfirmPassword", e)} type="password" placeholder="Comfirm your password" />
              </Form.Group>
              <Row className="justify-content-center align-items-center flex-column">
                <Button onClick={(e) => onSubmit(e)} variant="primary" type="submit">Submit</Button>
                <p>Have an account? Login <Link to="/login">here</Link> </p>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default Register;
