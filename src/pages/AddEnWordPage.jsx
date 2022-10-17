import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Field from "../components/forms/field";
import EnWordsAPI from "../services/EnWordsAPI";
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios';



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

    const handleSubmit =async  (e) => {
        e.preventDefault()
        try {
            const data = await EnWordsAPI.create(words)
            toast.success("Registered successfully")

            setWords({
                enWord: "",
                frWord: "" 
            })
            navigate("/en_words");

        } catch (error) {
            console.log(error)
            toast.error("Error")
        }
    }

    return (
        <>
            <div className="text-center">
                <h1 className="mb-5 h1">Add a new word</h1>
            </div>
            <div className="card">

                <form onSubmit={handleSubmit}>
                    <Field required value={words.enWord}
                        onChange={handleChange}
                        name="enWord"
                        label="English word"
                        placeholder="English word">
                    </Field>
                    <div className="mt-3">
                    <Field required value={words.frWord}
                        onChange={handleChange}
                        name="frWord"
                        label="French word"
                        placeholder="French word">
                    </Field>
                    </div>

                    <div className="mt-3 text-center">
                        <button className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>


        </>
    )
}

export default AddEnWordPage