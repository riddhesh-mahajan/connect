import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import Navbar from '../navbar/Navbar';

export default function Home() {
    const navigate = useNavigate();

    function navigateToSignup(){
        navigate('/signup')
    }

    return (
        <>
            <Navbar/>

            <div style={{minHeight: '80vh'}} className="row m-0">
                <div className="col-md-6 col-12 d-flex flex-column align-items-center justify-content-center">
                    <div className="col-9">
                        <p className="display-2 fw-bold">Connect with everyone</p>
                        <p>Share your thoughts and follow your friends to create the feed</p>
                        <button className="btn btn-lg btn-primary" onClick={navigateToSignup}>Get started</button>
                    </div>
                </div>

                <div className="col-6 d-none d-md-block">
                    <img src="https://riddhesh-mahajan-dev.s3.eu-west-3.amazonaws.com/illustrations/undraw_grades_re_j7d6.svg" alt="" className="col-10 mt-5" />
                </div>
            </div>
        </>
    )
}