import React, {useState} from "react";
import {Col, Form, Row} from "react-bootstrap";
import { useNavigate } from 'react-router-dom'

function LoginAgent() {
    const [email, setEmail] = useState('')
    const [password, setPwd] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [userId, setUserId] = useState(0)
    const [response, setRes] = useState('233')
    let navi = useNavigate()

    async function post_login() {
        //const request = "?email=" + email + "?password=" + password;
        const _response = await fetch('http://127.0.0.1:5000/auth/login', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({email, password})
        })
        // console.log("response...", _response)
        const data = await _response.json()
        // const id = data['user_id']
        // console.log("User id", id)
        // console.log("Response", data)
        return {data : data, status : _response.status}
            // .then(response => response['user_id'])
            // .catch(error => console.log(error.response))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setIsPending(true)
        const _response = await post_login()
        console.log(_response)
        if (_response['status'] == 200) {
            alert("login success!")
            setPwd('')
            setEmail('')
            setIsPending(false)
            navi("/app/home", {replace: true})
        } else {
            alert(_response['data']['error'])
            setPwd('')
            setEmail('')
            setIsPending(false)
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 styleform" controlId="formBasicEmail" >
                    <Form.Control type="email" placeholder="Enter Email Address..." value={email}
                                  onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3 styleform" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" value={password}
                                  onChange={(e)=>setPwd(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3 styleform small" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remeber me" />
                </Form.Group>
                {!isPending && <button className="d-block btn-primary btn-user w-100" type="submit">Login</button>}
                {isPending && <button className="d-block btn-primary btn-user w-100" disabled>Processing...</button>}
            </Form>
        </div>
    )
}

export default LoginAgent;