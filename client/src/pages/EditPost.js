import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditPost = () => {
    const { id } = useParams()
    
    const [post, setPost] = useState({
        title: '',
        content: '',
        image: ''
    })

    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })

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
        .catch(error => {
            console.log(error)
            navigate('/')
        })
    }, [])

    const handleForm = (e) => {
        setPost({...post, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.put('/api/post/edit/' + id, post)
        .then(resp => {
            setAlert({
                message: resp.data,
                status: 'success'
            })

            window.scrollTo(0, 0)

            setTimeout(() => navigate('/'), 2000)
        })
        .catch(error => {
            setAlert({
                message: error.response.data,
                status: 'danger'
            })
        })

    }

    return (
        <div className="container">
            <h2>Edit book</h2>
            {alert.message && (
                <div className={'alert alert-' + alert.status}>
                {alert.message}
                </div>
            )}
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group mb-2">
                    <label>Title:</label>
                    <input type="text" name="title" className="form-control" onChange={(e) => handleForm(e)} placeholder={post.title} />
                </div>

                <div className="form-group mb-2">
                    <label>Author:</label>
                    <input type="text" className="form-control" onChange={(e) => handleForm(e)} placeholder={post.author} ></input>
                </div>
                <div className="form-group mb-2">
                    <label>Cover Author:</label>
                    <input type="text" className="form-control" onChange={(e) => handleForm(e)} placeholder={post.cover_author} ></input>
                </div>
                <div className="form-group mb-2">
                    <label>ISBN Code:</label>
                    <input type="text" className="form-control" onChange={(e) => handleForm(e)} placeholder={post.ISBN_code} ></input>
                </div>
                <div className="form-group mb-2">
                    <label>Image:</label>
                    <input type="text" name="image" className="form-control" onChange={(e) => handleForm(e)} placeholder={post.image} />
                </div>
                <div className="form-group mb-2">
                    <img src={post.image} alt={post.title} style={{maxWidth: 150}}/>
                </div>
                <button className="btn btn-primary">Edit</button>
            </form>
        </div>
    )
}

export default EditPost