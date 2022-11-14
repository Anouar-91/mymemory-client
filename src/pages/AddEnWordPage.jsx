import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Field from "../components/forms/field";
import WordAPI from "../services/WordAPI";
import { toast } from 'react-toastify';
import addWordIllustration from '../assets/img/addWord-illustration.png'

function AddEnWordPage(props) {
    const navigate = useNavigate();
    const [words, setWords] = useState({
        enWord: "",
        frWord: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setWords({
            ...words,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await WordAPI.create(words)
            toast.success("Registered successfully")

            setWords({
                enWord: "",
                frWord: ""
            })
            navigate("/en_words");

        } catch (error) {
       
            toast.error("Error")
        }
    }

    return (
        <>
            <div className="container">
                <div className="title-primary mt-3 mb-4">
                    Add a new word
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6 mt-3">
                

                            <form onSubmit={handleSubmit}>
                                <Field required value={words.enWord}
                                     className="input-shadow"
                                    onChange={handleChange}
                                    name="enWord"
                         
                                    placeholder="English word">
                                </Field>
                                <div className="mt-3">
                                    <Field required value={words.frWord}
                                        className="input-shadow"
                                        onChange={handleChange}
                                        name="frWord"
                          
                                        placeholder="French word">
                                    </Field>
                                </div>

                                <div className="mt-3 text-center">
                                    <button className="btn btn-primary">Save</button>
                                </div>
                            </form>
                   
                    </div>
                    <div className="col-md-6 text-center mt-3">
                        <img src={addWordIllustration} className="img-fluid w-75" alt="illustration" />
                    </div>
                </div>

            </div>

        </>
    )
}

export default AddEnWordPage