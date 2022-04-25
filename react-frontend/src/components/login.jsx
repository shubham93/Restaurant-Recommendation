import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import {Container,Col,Row,Card,Form} from 'react-bootstrap';
import '../bootstrap.min.css';
import LoginAgent from '../LoginAgent'

export default class Login extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        return(

            <div>
        <Container>
          <Row className="justify-content-center">
            <Col md={9} lg={12} xl={10} >
            <Card className="card shadow-lg o-hidden border-0 my-5">
            <Card.Body className="p-0">
         
              <Row>
                <Col lg={6} className="d-none d-lg-flex">
                <div ref={this.imgdiv} className="flex-grow-1 bg-login-image"></div>
                </Col>
  
                <Col lg={6}>
                   <div className="p-5">
                   <div>
                <div className="text-center">
                              <h4 className="text-dark mb-4">Welcome Back!</h4>
                              </div>
                              <LoginAgent/>
                          <hr/>
                          <div className="text-center">
                            <Link to="../register">Create an Account!</Link>
                          </div>
                          <div className="text-center">
                            <Link to="/app/home">Back to Homepage</Link>
                          </div>
            </div>
                   </div>
                </Col>
              </Row>
             
            </Card.Body>
          </Card>
            </Col>
          </Row>
        </Container>
      </div>

        )
    }

}