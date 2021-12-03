import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios';
import { FaThumbsUp } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';


export default function Feed() {
    const [posts, setPosts] = useState([])
    const postContentRef = useRef()

    useEffect(() => {
        const data = null

        axios.get('api/v1/feed', { params: data })
        .then((response) => {
            if(response.status == 200) {
                setPosts(response.data)
            };
        }).catch(function (error) {
            console.log(error.response.data)
        });
    }, [])

    function post(){
        const postContent = postContentRef.current.value;

        const data = {
            content: postContent
        }

        axios.post('api/v1/post', data)
        .then((response) => {
            if(response.status == 201) {
                setPosts([response.data, ...posts])
            };
        }).catch(function (error) {
            console.log(error.response.data)
        });
    }

    return (
        <>
        <div className="d-flex mt-2 mb-2">
            <input type="text" ref={postContentRef} placeholder="Whats on your mind ?" className="form-control flex-fill me-2" />
            <button className="btn btn-primary" onClick={post}>Post</button>
        </div>

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
