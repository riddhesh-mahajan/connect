import React, {useRef, useState} from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


export default function Following() {
    const userNameRef = useRef()
    const [searchResults, setSearchResults] = useState([])

    function searchUsers(){
        const username = userNameRef.current.value;
        const data = {
            username: username
        }

        axios.get('api/v1/user/search', { params: data })
        .then((response) => {
            if(response.status == 200) {
                setSearchResults(response.data)
            };
        }).catch(function (error) {
            console.log(error.response.data)
        });
    }

    return (
        <>
        <div className="d-flex mt-2 mb-2">
            <input ref={userNameRef} type="text" placeholder="Whats on your mind ?" className="form-control flex-fill me-2" onChange={searchUsers}/>
        </div>
        
        {(() => {
        if (searchResults.length > 0) {
          return (
            <div className="shadow bg-white border col-6 p-2" style={{zIndex: 2, position: 'absolute'}}>
            {
                searchResults.map((result, index)=>{
                    return (
                        <div key={uuidv4()} className="border p-2 mb-2">
                            <p className="m-0">{result.first_name}</p>
                        </div>
                    )
                })
            }
            </div>
          )
        }
      })()}

        <h1>Risdsd</h1>
        <h1>Risdsd</h1>
        <h1>Risdsd</h1>
        <h1>Risdsd</h1>
        </>
    )
}
