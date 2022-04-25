import React from 'react';
import {Link} from 'react-router-dom'
import {Container,Col,Row,Card,Form} from 'react-bootstrap';
import '../bootstrap.min.css';
import RegisterAgent from "../RegisterAgent";

export default class Register extends React.Component{

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
                              <h4 className="text-dark mb-4">Create an Account!</h4>
                              </div>
                              <RegisterAgent/>
                          <hr/>
                          <div className="text-center">
                            <Link to="../login">Already have an account? Login!</Link>
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