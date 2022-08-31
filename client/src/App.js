import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react'
import NewPost from './pages/NewPost'
import Books from './pages/Books.js'
import NotFound from './pages/404.js'
import EditPost from './pages/EditPost.js'
import SinglePost from './pages/SinglePost.js'
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Main from './pages/Main';
import Header from './components/Header/Header'
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
     if(localStorage.getItem('loggedin') === 'true') 
      setLoggedIn(true)
  }, [])  

  return (
    <BrowserRouter>
    <Header loggedIn={loggedIn} />
    <Routes>
    <Route path="/" element={<Main loggedIn={loggedIn}/>} />
      <Route path="/books" element={<Books loggedIn={loggedIn}/>} />
      <Route path="/singlepost/:id" element={<SinglePost />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
      <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} />} />
      <Route path="*" element={<NotFound />} />
   
      {loggedIn && 
      <>
      <Route path="/new-post" element={<NewPost />} />
      <Route path="/edit/:id" element={<EditPost />} />
</>
}
    </Routes>
  </BrowserRouter>
  )
}

export default App;
