import React from 'react';
import {Outlet,NavLink} from 'react-router-dom'
import {Container,Input,Row,Card,Form,Navbar,Button} from 'react-bootstrap';
import '../bootstrap.min.css';

export default class Find extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <Container>
                    <h1>Find</h1>
                    <input></input>
                    <Button>Submit</Button>
                </Container>
            </div>
        )
    }
    

}