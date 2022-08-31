import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./NewPost.css"
import axios from 'axios'

const NewPost = () => {
    const [postForm, setPostForm] = useState({
        title: '',
        content: '',
        image: ''
    })
    const [alert, setAlert] = useState({
        message: '',
        status: ''
    })

    const navigate = useNavigate()

    const handleForm = (e) => {
        setPostForm({...postForm, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // const form = new FormData(e.target)

        // for(const key in postForm) {
        //     form.append(key, postForm[key])
        // }
        axios.post('/api/post/', postForm)
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
        <div className="form">
            <h1>Add new book</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-control">
                    <label>Title:</label>
                    <p></p>
                    <input type="text" name="title" onChange={(e) => handleForm(e)} />
                </div>
                <div className="form-control">
                    <label>Author:</label>
                    <p></p>
                    <input type="text" name='author' onChange={(e) => handleForm(e)}></input>
                </div>
                <div className="form-control">
                    <label>Cover Author:</label>
                    <p></p>
                    <input type="text" name='cover_author' onChange={(e) => handleForm(e)}></input>
                </div>
                <div className="form-control">
                    <label>ISBN Code:</label>
                    <p></p>
                    <input type="number" placeholder='ISBN' name='ISBN_code' onChange={(e) => handleForm(e)}></input>
                </div>
                <div className="form-control">
                    <label>Image:</label>
                    <p></p>
                    <input type="text" name="image" onChange={(e) => handleForm(e)} />
                </div>
                <button className="btn btn-primary">Add</button>
            </form>
        </div>
    )
}

export default NewPost