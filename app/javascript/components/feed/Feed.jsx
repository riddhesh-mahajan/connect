import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { FaThumbsUp } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';


export default function Feed() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const data = null

        axios.get('api/v1/feed', data)
        .then((response) => {
            if(response.status == 200) {
                setPosts(response.data)
            };
        }).catch(function (error) {
            console.log(error.response.data)
        });
    }, [])

    return (
        <>
        {
            posts.map((post, index)=>{
                return (
                    <div key={uuidv4()} className="bg-white shadow-sm p-2 rounded mt-2 border">
                        <p className="m-0">{post.content}</p>
                        <div className="d-flex mt-3">
                            <FaThumbsUp color="grey" className="me-2 mt-1"/>
                            <p className="m-0 text-secondary">{post.likes}</p>
                        </div>
                        
                    </div>
                )
            })
        }
        </>
    )
}
