import React from 'react'
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from './home/Home';


export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </HashRouter>
    )
}
