import React, {useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
import { useNavigate } from 'react-router-dom'

function RegisterAgent() {
    const [email, setEmail] = useState('')
    const [password, setPwd] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [userId, setUserId] = useState(0)
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [pwdConfirm, setPwdConfirm] = useState('')
    let navi = useNavigate()

    async function post_register() {
        const _response = await fetch('http://127.0.0.1:5000/auth/register', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({firstname : fName, lastname : lName, email : email, password : password})
        })
        const data = await _response.json()
        console.log("checkpoint 1", data)
        return {data : data, status : _response.status}
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setIsPending(true)
        if (password != pwdConfirm) {
            alert("Inconsistent password inputs!")
            setIsPending(false)
            return
        }
        const _response = await post_register()
        console.log(_response)
        if (_response['status'] == 200) {
            alert("register success!")
            setIsPending(false)
            navi("/login", {replace: true})
        } else {
            alert(_response['data']['error'])
            setIsPending(false)
        }
        setIsPending(false)
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>

                <Row mb={3}>
                    <Col className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Group className="mb-3 styleform">
                            <Form.Control type="text" placeholder="First Name" value={fName}
                                          onChange={(e)=>setFName(e.target.value)}/>
                        </Form.Group>

                    </Col>

                    <Col className="col-sm-6">
                        <Form.Group className="mb-3 styleform">
                            <Form.Control type="text" placeholder="Last Name" value={lName}
                                          onChange={(e)=>setLName(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3 styleform" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email" value={email}
                                  onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>


                <Row mb={3}>
                    <Col className="col-sm-6 mb-3 mb-sm-0">
                        <Form.Group className="mb-3 styleform" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" value={password}
                                          onChange={(e)=>setPwd(e.target.value)}/>
                        </Form.Group>

                    </Col>

                    <Col className="col-sm-6">
                        <Form.Group className="mb-3 styleform" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Repeat Password" value={pwdConfirm}
                                          onChange={(e)=>setPwdConfirm(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>


                {!isPending && <button className="d-block btn-primary btn-user w-100" type="submit">Register</button>}
                {isPending && <button className="d-block btn-primary btn-user w-100" disabled>Processing...</button>}

            </Form>
        </div>
    )
}
export default RegisterAgent;