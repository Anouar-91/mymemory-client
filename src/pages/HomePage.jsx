import React from 'react'
import { Link } from 'react-router-dom';
import mymemory from '../assets/img/mymemory.png';
import homeIllustration from '../assets/img/home-illustration.png';

function HomePage() {
    return (
        <div className="p-5 bg-primary home-bg">
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-md-7 ">
                        <img src={mymemory} alt="" className="img-fluid" />
                        <p className="col-md-8 fs-4 text-light">MyMemory is an web application developed to work on memory and English. </p>
                        <div className="d-flex">
                            <div className="col-md-3 mr-5 mr-md-0"><Link to="/login" className="btn btn-primary btn-lg" >Sign In</Link></div>
                            <div className="col-md-3"><Link to="/register" className="btn btn-secondary btn-lg" >Sign up</Link></div>
                        </div>
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