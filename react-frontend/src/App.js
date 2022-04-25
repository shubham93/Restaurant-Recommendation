import React from 'react';
import './App.css';
import {Route,Routes,Navigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login';
import Register from './components/register';
import Main from './components/main';
import Homepage from './components/homepage'
import Find from './components/find'
import AboutUs from './components/aboutus';
import Profile from './components/profile';

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
                      <Route path='about' element={<AboutUs/>}/>
                      <Route path='profile' element={<Profile/>}/>
                  </Route>

                  <Route path="*" element={<Navigate to="/login"></Navigate>}></Route>
                  
  
      </Routes>
    );
  }
}

export default App;
