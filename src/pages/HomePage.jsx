import React from 'react'
import { Link } from 'react-router-dom';
import mymemory from '../assets/img/mymemory.png';
import homeIllustration from '../assets/img/home-illustration.png';

function HomePage() {
    return (
        <div className="p-5 bg-primary home-bg">
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-md-7">
                        <img src={mymemory} alt="" />
                        <p className="col-md-8 fs-4 text-light">MyMemory is an web application developed to work on memory and English. </p>
                        <Link to="/login" className="btn btn-primary btn-lg" >Sign In</Link>&nbsp;&nbsp;
                        <Link to="/register" className="btn btn-secondary btn-lg" >Sign up</Link>
                    </div>
                    <div className="col-md-5">
                        <img src={homeIllustration} alt="" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage