import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const SinglePost = () => {
    const [post, setPost] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
       axios.get('/api/post/' + id)
        .then(resp => {
            if(!resp.data) {
                navigate('/')
                return 
            }
            setPost(resp.data)
        })
        .catch((error) => {
            console.log(error)
            navigate('/')
        })
    }, [])

    return (

        <div className="container">
            <div className="single-post">
                <h1>{post.title}</h1>
                <div className="author">
                    <h3>Book author:
                    <h4>{post.author}</h4>
                    </h3>
                </div>
                <div className="cover_author">
                    <h3>Cover by:<h4>{post.cover_author}</h4></h3>
                    </div>
            </div>
            <div className="ISBN_code">
                <h3>ISBN code:<h4>{post.ISBN_code}</h4></h3>
                </div>
                <div className="image">
                    <img src={post.image} alt={post.title} style={{maxWidth: 1000}} />
                </div>
        </div>
    ) 
}

export default SinglePost