import React, { useState, useContext } from 'react'
import AuthAPI from '../services/AuthAPI'
import { useNavigate } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import Field from "../components/forms/field"
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import loginIllustration from '../assets/img/login-illustration.png';

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
            navigate("/en_words");
            setLoading(false)
        } catch (error) {
            console.log(error.response.data)
            toast.error('Une erreur est survenue')
            setError("Aucun compte ne correspond à ces identifiants !")
            setLoading(false)

        }
    }
    return (
        <>
            <div className="container-fluid card-bg-primary position-relative">
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
                <div className="text-center d-md-block d-none" style={{ position: 'absolute', bottom: "-66%", left: "50%", transform: 'translateX(-50%)' }}>
                    <img src={loginIllustration} alt="" />
                </div>
            </div>



        </>
    )
}

export default LoginPage