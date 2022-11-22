import React, { useState, useContext } from 'react'
import AuthAPI from '../services/AuthAPI'
import { useNavigate } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import Field from "../components/forms/field"
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import loginIllustration from '../assets/img/login-illustration.png';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function LoginPage() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState("")

    const handleChange = e => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const token = await AuthAPI.authenticate(credentials)
            setError("")
            setIsAuthenticated(true)
            toast.success('Vous êtes désormais connecté')
            navigate("/news");
            setLoading(false)
        } catch (error) {
            toast.error('Une erreur est survenue')
            setError("Aucun compte ne correspond à ces identifiants !")
            setLoading(false)

        }
    }

    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);
 
    return (
        <>
{/*            <Particles
                     id="tsparticles"
                     init={particlesInit}
                     loaded={particlesLoaded}
                     options={{
                         background: {
                             color: {
                                 value: "#F3F3F3",
                             },
                         },
                         fpsLimit: 120,
                         interactivity: {
                             events: {
                                 onClick: {
                                     enable: true,
                                     mode: "push",
                                 },
                                 onHover: {
                                     enable: true,
                                     mode: "repulse",
                                 },
                                 resize: true,
                             },
                             modes: {
                                 push: {
                                     quantity: 4,
                                 },
                                 repulse: {
                                     distance: 200,
                                     duration: 0.4,
                                 },
                             },
                         },
                         particles: {
                             color: {
                                 value: "#2D0000",
                             },
                             links: {
                                 color: "#2D0000",
                                 distance: 150,
                                 enable: true,
                                 opacity: 0.5,
                                 width: 1,
                             },
                             collisions: {
                                 enable: true,
                             },
                             move: {
                                 direction: "none",
                                 enable: true,
                                 outModes: {
                                     default: "bounce",
                                 },
                                 random: false,
                                 speed: 4,
                                 straight: false,
                             },
                             number: {
                                 density: {
                                     enable: true,
                                     area: 800,
                                 },
                                 value: 80,
                             },
                             opacity: {
                                 value: 0.5,
                             },
                             shape: {
                                 type: "circle",
                             },
                             size: {
                                 value: { min: 1, max: 5 },
                             },
                         },
                         detectRetina: true,
                     }}
           /> */}
            <div className="container-fluid card-bg-primary">
                <div className="p-5">
                    <h1 className="h1 text-center">Connexion à l'application</h1>
                    <div className="row mt-5 justify-content-center">
                        <div className="col-md-8">

                            {!loading ? (
                                <form onSubmit={handleSubmit} >
                                    <Field name="username" label="Email" value={credentials.username} onChange={handleChange} placeholder="Email de connexion" type="email" error={error} />
                                    <div className="mt-3">


                                        <Field name="password" label="Password" value={credentials.password} onChange={handleChange} placeholder="Mot de passe" type="password" error="" />
                                    </div>

                                    <div className="form-group mt-3 text-center">
                                        <button className="btn btn-secondary">Connexion</button>
                                    </div>
                                </form>

                            ) : (
                                <ThreeDots
                                    color="#C30028"
                                    wrapperStyle={{ justifyContent: 'center' }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage