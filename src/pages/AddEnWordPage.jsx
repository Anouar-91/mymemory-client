import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Field from "../components/forms/field";
import EnWordsAPI from "../services/EnWordsAPI";
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios';



function AddEnWordPage(props) {

    const [word, setWord] = useState({
        en: "",
        fr: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setWord({
            ...word,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://127.0.0.1:8000/api/fr_words", {
            content: word.fr
        }).then((response) => {
            axios.post('http://127.0.0.1:8000/api/en_words')
        })
    }

    return (
        <>
            <div className="text-center">
                <h1 className="mb-5 h1">Add a new word</h1>
            </div>
            <div className="card">

                <form onSubmit={handleSubmit}>
                    <Field value={word.en}
                        onChange={handleChange}
                        name="en"
                        label="English word"
                        placeholder="English word">
                    </Field>
                    <div className="mt-3">
                    <Field value={word.fr}
                        onChange={handleChange}
                        name="fr"
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