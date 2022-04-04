import React from 'react';
import {Outlet,NavLink,Link} from 'react-router-dom'
import {Container,Col,Row,Card,Form,Button} from 'react-bootstrap';

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
                            <Link to="../register">Create an Account!</Link>
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