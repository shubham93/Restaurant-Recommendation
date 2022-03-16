import logo from './logo.svg';
import './App.css';
import {Container,Col,Row,Card,Form,Button} from 'react-bootstrap';
import {NavLink,BrowserRouter,Route,Routes,Outlet} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
function App() {
  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col md={9} lg={12} xl={10} >
          <Card className="card shadow-lg o-hidden border-0 my-5">
          <Card.Body className="p-0">
       
            <Row>
              <Col lg={6} className="d-none d-lg-flex">
              <div className="flex-grow-1 bg-login-image"></div>
              </Col>

              <Col lg={6}>
                 <div className="p-5">
                      <Routes>
                <Route path="/" >
                  <Route path="login" element={<Login/>}/>
                  <Route path="register" element={<Register/>} />
                  
                </Route>
                
                <Route index element={<Login/>} />

              </Routes>
                 </div>
              </Col>
            </Row>
           
          </Card.Body>
        </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
