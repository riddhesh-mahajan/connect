import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios';
import { FaThumbsUp } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';


export default function Feed() {
    const [posts, setPosts] = useState([])
    const postContentRef = useRef()

    useEffect(() => {
        const data = null

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt','');
        axios.get('api/v1/feed', { params: data })
        .then((response) => {
            if(response.status == 200) {
                console.log(response.data[0].user.first_name)
                setPosts(response.data)
            };
        }).catch(function (error) {
            console.log(error.response.data)
        });
    }, [])

    function post(){
        const postContent = postContentRef.current.value;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt','');
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

    function like(postId, index){
        const data = {
            post_id: postId
        }
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt','');
        axios.post('api/v1/post/like', data)
        .then((response) => {
            if(response.status == 200) {
                setPosts(prevPosts=>{
                    const tempPosts = [...prevPosts]
                    tempPosts[index] = response.data
                    return tempPosts
                })
            };
        }).catch(function (error) {
            console.log(error.response.data)
        });
    }

    function formatDatetime(newDate, separator='-'){   
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        let hours = newDate.getHours();
        let minutes = newDate.getMinutes();

        return `${date<10?`0${date}`:`${date}`}${separator}${month<10?`0${month}`:`${month}`}${separator}${year} ${hours<10?`0${hours}`:`${hours}`}:${minutes<10?`0${minutes}`:`${minutes}`}`
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
                    <div key={uuidv4()} className="bg-white shadow-sm p-3 rounded mt-2 border">
                        <div className="d-flex align-items-center">
                            <div className="d-flex align-items-center me-auto">
                                <div className="d-flex align-items-center justify-content-center me-2 fw-bold text-light" style={{backgroundColor: post.user.default_pp_color, borderRadius: '100px', minHeight: '32px', minWidth: '32px'}}>
                                    {post.user.first_name[0]}
                                </div>
                                <p className="m-0">{post.user.first_name}</p>
                            </div>
                            
                            <p className="m-0 text-secondary" style={{fontSize: '0.7rem'}}>{formatDatetime(new Date(post.user.created_at))}</p>
                        </div>
                        
                        <div className="ms-2 mt-3">
                            <p className="m-0">{post.content}</p>
                            <div className="d-flex mt-3" onClick={()=>{like(post.id, index)}} style={{cursor: 'pointer'}}>
                                <FaThumbsUp color={post.likes>0?'#42A5F5':'grey'} className="me-2 mt-1"/>
                                <p className="m-0 text-secondary">{post.likes}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        </>
    )
}
