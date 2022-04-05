import React from 'react';
import {Outlet,NavLink} from 'react-router-dom'
import {Container,Col,Row,Card,Form,Navbar,Button} from 'react-bootstrap';
import '../bootstrap.min.css';

export default class Homepage extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Container>
                    <h1>Homepage</h1>
                    <p>Welcome!</p>
                </Container>
            </div>
        )
    }
    

}