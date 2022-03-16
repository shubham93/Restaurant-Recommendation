import React from 'react';
import {Container,Col,Row,Card,Form,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

export default class Login extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <div className="text-center">
                              <h4 className="text-dark mb-4">Welcome Back!</h4>
                              </div>
                              <Form>
                            <Form.Group className="mb-3 styleform" controlId="formBasicEmail">
                              <Form.Control type="email" placeholder="Enter Email Address..." />
                            </Form.Group>

                            <Form.Group className="mb-3 styleform" controlId="formBasicPassword">
                              <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3 styleform small" controlId="formBasicCheckbox">
                              <Form.Check type="checkbox" label="Remeber me" />
                            </Form.Group>
                            <Button bsPrefix="btn-user" className="d-block btn-primary btn-user w-100">Login</Button>
                            
                          </Form>      
                          <hr/>
                          <div className="text-center">
                            <Link to="/register">Create an Account!</Link>
                          </div>
            </div>
        )
    }
}