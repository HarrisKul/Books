import { Link } from 'react-router-dom'
import './Header.css'

const Header = (props) => {
    const loggedIn = props.loggedIn

    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <span className="fs-4">The Best Books</span>
            </Link>
        
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link to="/" className="nav-link" aria-current="page">Main</Link>
                </li>
                <li className="nav-item">
                    <Link to="/books" className="nav-link" aria-current="page">Books</Link>
                </li>
             
                {loggedIn ?  (

                    <>
                             <li className="nav-item">
                    <Link to="/new-post" className="nav-link" aria-current="page">Add new book</Link>
                </li>
                <li className="nav-item">
                    <Link to='/logout' className="nav-link"
                     aria-current="page">Logout</Link>
                </li>
            
                    </>
           
            ) : (
            <>
                <li className="nav-item">
                    <Link to="/register" className="nav-link" aria-current="page">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link" aria-current="page">Login</Link>
                </li>
                </>
                  )}
            </ul>
            </header>
        </div>
    
    )
}

export default Header