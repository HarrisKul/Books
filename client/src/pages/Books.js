import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Books = (props) => {
    const { loggedIn } = props
    const [posts, setPosts] = useState([])
    const [alert, setAlert] = useState({
      message: '',
      status: ''
    })
    const [refresh, setRefresh] = useState(false)
  
    useEffect(() => {
      axios.get('/api/post/')
      .then(resp => { 
        setPosts(resp.data)
      })
      .catch(error => {
        setAlert({
          message: error.response.data,
          status: 'danger'
        })
      })
    }, [refresh])
  
    const handleDelete = (id) => {
      if(isNaN(id) || !loggedIn)
        return
      
      fetch('/api/post/delete/' + id, {
        method: 'DELETE'
      })
      .then(resp => resp.json())
      .then(resp => {
        setAlert({
          message: resp.message,
          status: 'success'
        })
        setRefresh(!refresh)
        window.scrollTo(0, 0)
      })
      .catch(error => {
        console.log(error)
        setAlert({
          message: 'server error',
          status: 'danger'
        })
        window.scrollTo(0, 0)
      })
      .finally(() => {
        setTimeout(() => setAlert({
          message: '',
          status: ''
        }), 3000)
      })
      
    }
  
    return (
      <div className="container">
        {alert.message && (
          <div className={'alert alert-' + alert.status}>
            {alert.message}
          </div>
        )}
       <h1>The Top 10 books chosen by 125 top writers</h1>
       <br></br>
       <br></br>
        <div className="articles">
          {posts.length > 0 && posts.map(article => {
            return (
              <div key={article.id} className="box">
                <Link to={'/post/' + article.id} className="article-link">
                  <h3>{article.title}</h3>
                </Link>
                <div className="image">
                  <Link to={'/post/' + article.id}>
                    <img src={article.image} alt={article.title} />
                  </Link>
                </div>
                <div className="controls">
                <button>  <Link to={'/singlepost/' + article.id} className="read-more">Read more</Link></button>
                {loggedIn &&  
                  <div className='buttons'>
                 <button> <Link to={'/edit/' + article.id} className="edit">Edit</Link></button>
                  <button onClick={() => handleDelete(article.id)} className="delete">Delete</button>
                  </div>
                }
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
}

export default Books;