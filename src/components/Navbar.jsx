import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import AuthAPI from '../services/AuthAPI';
import { toast } from 'react-toastify';
import logo from '../assets/img/logo.png'



function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);


  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
    toast.info('Vous êtes désormais déconnecté')
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand" ><img src={logo} alt="" className="img-fluid logo-nav" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            {isAuthenticated ? (
              <Link className="nav-link" aria-current="page" to="/news">Home</Link>
            ):(
              <Link className="nav-link" aria-current="page" to="/">Home</Link>

            )}
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/en_words">English Words</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/choice_quiz">Quiz Word <i className="fa-solid fa-feather"></i></Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto ml-3 mt-3 mt-md-0">
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                  <Link to={"login"} className="btn btn-primary">Login</Link>
                </li></>)
              : (
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar