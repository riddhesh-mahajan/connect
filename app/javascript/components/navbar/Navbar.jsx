import React from 'react'
import { useNavigate, Link } from "react-router-dom";

export default function Navbar({showLoginButton=true}) {
    const navigate = useNavigate();

    function navigateToLogin(){
        navigate('/login')
    }

    function navigateToSignup(){
        navigate('/signup')
    }

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="https://riddhesh-mahajan-dev.s3.eu-west-3.amazonaws.com/illustrations/connect_logo.svg" alt="Connect logo" width="30" height="24" className="d-inline-block align-text-top" />
                    <span className="ms-2 fs-4 fw-bold">Connect</span>
                </a>

                {showLoginButton ? (
                    <div className="d-flex">
                        <button className="btn btn-primary me-2" onClick={navigateToLogin}>Log in</button>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </nav>
    )
}
