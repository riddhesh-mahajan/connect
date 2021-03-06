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
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt','');
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
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt','');

        axios.post('api/v1/following',  data)
        .then((response) => {
            if(response.status == 201) {
                console.log(followings)
                setFollowings(prevFollowings=>{
                    return [response.data, ...prevFollowings]
                })
                console.log(followings)
                setSearchResults([])
            };
        }).catch(function (error) {
            setSearchResults([])
            userNameRef.current.value = ''
        });
    }

    function searchUsers(){
        const username = userNameRef.current.value;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt','');
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

    function unfollow(id, index){
        const data = {
            id: id
        }
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt','');
        axios.delete('api/v1/following', { params: data })
        .then((response) => {
            if(response.status == 200) {
                setFollowings(prevFollowing=>{
                    var pc = [...prevFollowing]
                    console.log(pc)

                    pc.splice(index, 1);
                    console.log(pc)
                    return pc
                })
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
                <div className="hover shadow bg-white col-6" style={{zIndex: 2, position: 'absolute'}}>
                {
                    searchResults.map((result, index)=>{
                        return (
                            <div onClick={()=>{followUser(result.id)}} key={uuidv4()} className="border p-2 d-flex align-items-center" style={{cursor: 'pointer'}}>
                                    <div className="d-flex align-items-center justify-content-center me-2 fw-bold text-light" style={{backgroundColor: result.default_pp_color, borderRadius: '100px', minHeight: '32px', minWidth: '32px'}}>
                                        {result.first_name[0]}
                                    </div>
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
                    <div key={uuidv4()} className="border p-2 mb-2 d-flex align-items-center">
                        <div className="d-flex align-items-center me-auto">
                            <div className="d-flex align-items-center justify-content-center me-2 fw-bold text-light" style={{backgroundColor: result.default_pp_color, borderRadius: '100px', minHeight: '32px', minWidth: '32px'}}>
                                {result.first_name[0]}
                            </div>
                            <p className="m-0">{result.first_name}</p>
                        </div>

                        <button className="btn btn-primary" onClick={()=>{unfollow(result.id, index)}}>Unfollow</button>
                    </div>
                )
            })
        }

        </>
    )
}
