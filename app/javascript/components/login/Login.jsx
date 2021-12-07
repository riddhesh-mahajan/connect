import React, {useRef, useState} from 'react'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../navbar/Navbar';


export default function Login() {
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState([])

    function navigateToSignup(){
        navigate('/signup')
    }

    function login(){
        const data = {
            'email': emailRef.current.value,
            'password': passwordRef.current.value,
        }

        axios.get('api/v1/user/login', { params: data })
        .then((response)=>{
            console.log("Riddhesh")
            console.log(response.status);

            if(response.status == 200){
                localStorage.setItem("jwt", response.data);
                navigate('/dashboard/feed')
            }
        }).catch(function (error) {
            const tempErrorMessages = [];

            if(error.response.status == 403) tempErrorMessages.push('Wrong credentials')

            setErrorMessages(tempErrorMessages);
        });;
    }

    return (
        <>
        <Navbar showLoginButton={false}/>

        <div className="d-flex align-items-center flex-column" style={{minHeight: '100vh'}}>
            <div className="col-12 col-md-3 mt-5 p-3">
                <p className="display-5 text-center mb-4 fw-bold">Login</p>

                <input ref={emailRef} type="text" placeholder="Email" className="form-control mb-1" />

                <input ref={passwordRef} type="text" placeholder="Password" className="form-control mb-1" />
                
                {
                    errorMessages.map((error)=>{
                        return (<p key={uuidv4()} className="mb-1 text-danger">{error}</p>)
                    })
                }

                <button onClick={login} className="btn btn-primary col-12 mt-3">Login</button>
                <p className="m-0 text-center mt-3">OR</p>
                <button onClick={navigateToSignup} className="btn btn-primary col-12 mt-3">Signup</button>
            </div>
        </div>
        </>
    )
}