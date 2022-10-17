import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import AuthAPI from '../services/AuthAPI';
import { toast } from 'react-toastify';




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
        <a className="navbar-brand" href="#">MyMemory</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/en_words">English Words</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto ml-3 mt-3 mt-md-0">
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Inscription</Link>
                </li>
                <li className="nav-item">
                  <Link to={"login"} className="btn btn-success">Connexion</Link>
                </li></>)
              : (
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-danger">Déconnexion</button>
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