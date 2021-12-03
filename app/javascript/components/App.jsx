import React from 'react'
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from './home/Home';
import Login from './login/Login';
import Signup from './signup/Signup';
import Dashboard from './dashboard/Dashboard';


export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/Dashboard/*" element={<Dashboard />} />
            </Routes>
        </HashRouter>
    )
}
