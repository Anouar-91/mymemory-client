import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">MyMemory</h1>
                <p className="col-md-8 fs-4">MyMemory is an web application developed to work on memory and English. </p>
                <Link to="/login" className="btn btn-primary btn-lg" >Sign In</Link>&nbsp;&nbsp;
                <Link to="/register" className="btn btn-secondary btn-lg" >Sign up</Link>
            </div>
        </div>
    )
}

export default HomePage