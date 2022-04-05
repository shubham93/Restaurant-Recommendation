import logo from './logo.svg';
import React from 'react';
import './App.css';
import {Container,Col,Row,Card,Form,Button} from 'react-bootstrap';
import {NavLink,BrowserRouter,Route,Routes,Outlet,Navigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import Main from './components/main';
import UserAuth from './components/user';
import Homepage from './components/homepage'
import Find from './components/find'

class App extends React.Component {
  constructor(props){
    super(props);
    this.imgdiv = React.createRef() ;
    this.changeImg = this.changeImg.bind(this);
  }



  changeImg = (newUrl) =>{
      console.log(this.imgdiv.current);
  }

  render(){
    return (
      <Routes>
                  
                  <Route path="login" element={<Login/>}/>
                  <Route path="register" element={<Register/>} />
                  

                  <Route path="app"  element={<Main/>} >
                      <Route path="home" element={<Homepage/>}/>
                      <Route path="find" element={<Find/>}/>
                    </Route>

                  <Route path="*" element={<Navigate to="/app/home"></Navigate>}></Route>
                  
  
      </Routes>
    );
  }
}

export default App;
