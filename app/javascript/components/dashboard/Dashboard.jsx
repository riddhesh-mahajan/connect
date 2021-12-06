import React from 'react'
import Feed from '../feed/Feed';
import Following from '../following/Following';
import { Routes, Route, HashRouter } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    function openFeed(){
        navigate('feed')
    }

    function openFollowing(){
        navigate('following')
    }

    function logout(){
        localStorage.clear()
        navigate('/login')
    }

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold" href="#">Connect</a>

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    
                </ul>
                <div className="d-flex">
                    <p className="m-0 text-danger fw-bold me-4" style={{cursor: 'Pointer'}} onClick={logout}>Log out</p>
                </div>
            </div>
        </nav>

        <div className="container col-6 p-0 pb-5">
            <div className="row m-0" style={{cursor: 'pointer'}}>
                <div className="col-6 text-center border p-2 bg-primary" onClick={openFeed}>
                    <p className="m-0 text-light fw-bold">Feed</p>
                </div>
                <div className="col-6 text-center border p-2 bg-primary" onClick={openFollowing}>
                    <p className="m-0 text-light fw-bold">Following</p>
                </div>
            </div>
            
            <Routes>
                <Route path="/feed" element={<Feed />} />
                <Route path="/following" element={<Following />} />
            </Routes>
        </div>
        </>
    )
}
