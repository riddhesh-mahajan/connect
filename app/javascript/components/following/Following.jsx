import React, {useRef, useState, useEffect} from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


export default function Following() {
    const userNameRef = useRef()
    const [searchResults, setSearchResults] = useState([])
    const [followings, setFollowings] = useState([])

    useEffect(() => {
        loadFollowing()
    }, [])

    function loadFollowing(){
        const data = null

        axios.get('api/v1/following', { params: data })
        .then((response) => {
            if(response.status == 200) {
                setFollowings(response.data)
            };
        }).catch(function (error) {
            console.log(error.response.data)
        });
    }

    function followUser(followed_user_id){
        const data = {
            'followed_user_id': followed_user_id
        }

        axios.post('api/v1/following',  data)
        .then((response) => {
            if(response.status == 201) {
                console.log(followings)
                setFollowings(prevFollowings=>{
                    return [response.data, ...prevFollowings]
                })
                console.log(followings)
            };
        }).catch(function (error) {
            console.log(error.response.data)
        });
    }

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
            <input ref={userNameRef} type="text" placeholder="Username" className="form-control flex-fill" onChange={searchUsers}/>
        </div>
        
        {(() => {
            if (searchResults.length > 0) {
            return (
                <div className="shadow bg-white border col-6 p-2" style={{zIndex: 2, position: 'absolute'}}>
                {
                    searchResults.map((result, index)=>{
                        return (
                            <div onClick={()=>{followUser(result.id)}} key={uuidv4()} className="border p-2 mb-2">
                                <p className="m-0">{result.first_name}</p>
                            </div>
                        )
                    })
                }
                </div>
            )
            }
        })()}

        {
            followings.map((result, index)=>{
                return (
                    <div key={uuidv4()} className="border p-2 mb-2">
                        <p className="m-0">{result.first_name}</p>
                    </div>
                )
            })
        }

        </>
    )
}
