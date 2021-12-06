import React, {useRef, useState} from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";



export default function Signup() {
    const firstNameRef = useRef('')
    const lastNameRef = useRef('')
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const confirmPasswordRef = useRef('')

    const [errorMessages, setErrorMessages] = useState([])
    const navigate = useNavigate();

    function signup(){
        const data = {
            'first_name': firstNameRef.current.value,
            'last_name': lastNameRef.current.value,
            'email': emailRef.current.value,
            'password': passwordRef.current.value,
        }

        axios.post('api/v1/user/create', data)
        .then((response) => {
            console.log(response)
            if(response.status == 201) {
                navigate('/login')
            };
            
        }).catch(function (error) {
            console.log('AAA')
            console.log(error.response.data)
            const keys = Object.keys(error.response.data);
            console.log(keys);
            const tempErrorMessages = [];

            keys.forEach(key => {
                tempErrorMessages.push(key + ' ' + error.response.data[key])
                
            });

            setErrorMessages(tempErrorMessages);
            console.log(tempErrorMessages)
        });
    }

    return (
        <div className="d-flex align-items-center flex-column" style={{minHeight: '100vh'}}>
            <div className="col-12 col-md-3 mt-5 p-3">
                <p className="display-5 text-center mb-4 fw-bold">Signup</p>

                <input ref={firstNameRef} type="text" placeholder="First name" className="form-control mb-1" />
                
                <input ref={lastNameRef} type="text" placeholder="Last name" className="form-control mb-1"/>

                <input ref={emailRef} type="text" placeholder="Email" className="form-control mb-1"/>

                <input ref={passwordRef} type="password" placeholder="Password" className="form-control mb-1"/>
                <input ref={confirmPasswordRef} type="password" placeholder="Confirm password" className="form-control mb-1"/>

                {
                    errorMessages.map((error)=>{
                        return (<p key={uuidv4()} className="mb-1 text-danger">{error}</p>)
                    })
                }
                
                <button onClick={signup} className="btn btn-primary col-12 mt-3">Signup</button>
            </div>
        </div>
    )
}