import React from 'react';
import {Container,Col,Row,Card,Form,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

export default class Register extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <div className="text-center">
                              <h4 className="text-dark mb-4">Create an Account!</h4>
                              </div>
                              <Form>

                                <Row mb={3}>
                                    <Col className="col-sm-6 mb-3 mb-sm-0">
                                    <Form.Group className="mb-3 styleform">
                                        <Form.Control type="text" placeholder="First Name" />
                                    </Form.Group>

                                    </Col>

                                    <Col className="col-sm-6">
                                        <Form.Group className="mb-3 styleform">
                                            <Form.Control type="text" placeholder="Last Name" />
                                        </Form.Group>
                                    </Col>
                                </Row>      

                            <Form.Group className="mb-3 styleform" controlId="formBasicEmail">
                              <Form.Control type="email" placeholder="Email" />
                            </Form.Group>


                            <Row mb={3}>
                                    <Col className="col-sm-6 mb-3 mb-sm-0">
                                    <Form.Group className="mb-3 styleform" controlId="formBasicPassword">
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>

                                    </Col>

                                    <Col className="col-sm-6">
                                        <Form.Group className="mb-3 styleform" controlId="formBasicPassword">
                                            <Form.Control type="password" placeholder="Repeat Password" />
                                        </Form.Group>
                                    </Col>
                                </Row>   

                            
                            <Button bsPrefix="btn-user" className="d-block btn-primary btn-user w-100">Register Account</Button>
                            
                          </Form>      
                          <hr/>
                          <div className="text-center">
                            <Link to="/login">Already have an account? Login!</Link>
                          </div>
            </div>
        )
    }

}