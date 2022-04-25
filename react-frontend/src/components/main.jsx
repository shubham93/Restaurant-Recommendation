import React from 'react';
import {Outlet,NavLink,Link} from 'react-router-dom'
import {Alert} from 'react-bootstrap';
import '../bootstrap.min.css';
import { AiFillEnvironment, AiFillHome, AiFillSmile, AiOutlineTeam,AiOutlineHeart } from 'react-icons/ai';

export default class Main extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            loggedIn:false,
            username:"TestUserName"
        }
    }

    render(){

        return(
        <div>
        <div id="wrapper">
        {/*Navbar here */}
        <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
            <div className="container-fluid d-flex flex-column p-0"><a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                    <div className="sidebar-brand-icon rotate-n-15"></div>
                    <div className="sidebar-brand-text mx-3"><AiFillSmile size="2em"  /><span>  WHAT TO EAT</span></div>
                </a>
                <hr className="sidebar-divider my-0" />
                <ul className="navbar-nav text-light" id="accordionSidebar">
                    <li className="nav-item"><NavLink  className="nav-link"  to="/app/home"><AiFillHome size="1em" /><span>  Home</span></NavLink></li>
                    <li className="nav-item"><NavLink  className="nav-link"  to="/app/find"><AiFillEnvironment size="1em" /><span>  Find a restaurant</span></NavLink></li>
                    <li className="nav-item"><NavLink  className="nav-link"  to="/app/profile"><AiOutlineHeart size="1em" /><span>  User profile</span></NavLink></li>
                    <li className="nav-item"><NavLink  className="nav-link"  to="/app/about"><AiOutlineTeam size="1em" /><span>  About Us</span></NavLink></li>
                </ul>
                
            </div>
        </nav>
        
        <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                    {/* Login link here*/}
                    <div className="container-fluid">
                        <ul className="navbar-nav flex-nowrap ms-auto">
                            <div className="d-none d-sm-block topbar-divider"></div>
                            <li className="nav-item dropdown no-arrow">
                                <div className="nav-item dropdown no-arrow">
                                    <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                                        <span className="d-none d-lg-inline me-2 text-gray-600 small">
                                            {this.state.loggedIn?this.state.username:<Link to="../login">Logout</Link>}
                                            </span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container-fluid">
                    <div>
                        {/*{this.state.loggedIn?<div/>:<Alert>Please login</Alert>}*/}
                        <Outlet/>
                        </div>
                </div>
            </div>
            <footer className="bg-white sticky-footer">
                <div className="container my-auto">
                    <div className="text-center my-auto copyright"><span>Copyright © WHAT TO EAT 2022</span></div>
                </div>
            </footer>
             </div>
                 </div>
        </div>
        )

    }

}
