import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Field from '../components/forms/field';
import UsersAPI from '../services/UsersAPI';
import { toast } from 'react-toastify';
import registerIllustration from '../assets/img/register-illustration.png';


function RegisterPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        username: "",
    })
    const [errors, setErrors] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordConfirm: "",
    })
    const handleChange = e => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiErrors = {}
        if (user.password !== user.confirmPassword) {
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
            setErrors(apiErrors)
            return;
        }
        try {
            const response = await UsersAPI.register(user);
            setUser({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                username: ""
            })
            toast.success("Registered successfully ! Please login")

            navigate('/login');
        } catch (error) {
            toast.error('Une erreur est survenue')
            error.response.data.violations.forEach((violation) => {
                apiErrors[violation.propertyPath] = violation.message;
            })
            setErrors(apiErrors)
        }
    }

    return (
        <>

            <div className="container-fluid card-bg-primary position-relative">
                <h1 className="h1">Inscription</h1>
                <div className="row justify-content-center p-5">
                    <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <Field
                                        required
                                        name="firstname"
                                        label="Your firsname"
                                        placeholder="Your firstname"
                                        value={user.firstname}
                                        onChange={handleChange}
                                        error={errors.firstname}
                                    ></Field>

                                </div>
                                <div className="col-md-6">
                                    <Field
                                        required
                                        name="lastname"
                                        label="Lastname"
                                        placeholder="Your lastname"
                                        value={user.lastname}
                                        onChange={handleChange}
                                        error={errors.lastname}
                                    ></Field>
                                </div>
                            </div>
                            <div className="mb-3">
                                <Field
                                    required
                                    name="email"
                                    label="Email"
                                    placeholder="Your email"
                                    value={user.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    type='email'
                                ></Field>
                            </div>
                            <div className="mb-3">
                                <Field
                                    required
                                    name="password"
                                    label="Password"
                                    placeholder="Your password"
                                    value={user.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                    type="password"
                                ></Field>
                            </div>

                            <Field
                                name="confirmPassword"
                                label="Confirm your password"
                                placeholder="password"
                                value={user.confirmPassword}
                                onChange={handleChange}
                                error={errors.passwordConfirm}
                                type="password"
                            ></Field>
                            <div className="form-group mt-3 text-center">

                                <button className="btn btn-secondary">Submit</button>
                                <p>Already have an account ?<Link to="/login" className="btn btn-link"> <strong>Sign in</strong> </Link></p>

                            </div>
                        </form>
                    </div>

              

                </div>
                <div className="text-center d-md-block d-none" style={{position: 'absolute', bottom:"0%", left:"12%", transform: 'translateX(-50%)'}}>
                <img src={registerIllustration} alt="" className="img-fluid w-75" />
            </div>
            </div>




        </>
    )
}

export default RegisterPage