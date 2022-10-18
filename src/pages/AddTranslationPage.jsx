import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Field from "../components/forms/field";
import WordAPI from "../services/WordAPI";
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios';



function AddTranslationPage(props) {
    const navigate = useNavigate();
    const [enWord, setEnWord] = useState()
    const [frWord, setFrWord] = useState("")
    const [loading, setLoading] = useState(true)
    let { id } = useParams();

    const fetchEnWord = async () => {
       const data =  await WordAPI.find(id)
       setEnWord(data);
       setLoading(false)
    }

    useEffect(() => {
        fetchEnWord()
    })

    const handleChange = (e) => {
        const {value} = e.currentTarget;
        setFrWord( value)
    }


    const handleSubmit =async  (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const data = await WordAPI.addFrTranslation(frWord, id)
            toast.success("Registered successfully")
            setFrWord("")
            navigate("/en_words");
            setLoading(false)


        } catch (error) {
            console.log(error)
            toast.error("Error")
            setLoading(false)

        }
    }

    return (
        <>
                   {loading ? (
                    <div className="text-center">
               <ThreeDots 
                                     height="80"
                                     width="80"
                                     radius="9"
                                     color="#0d6efd"
                                     ariaLabel="three-dots-loading"
                                     wrapperStyle={{ marginLeft: '50%', transform: 'translateX(-10%)' }}
                                     wrapperClassName=""
                                     visible={true}
               />
                    </div>
         
                ): (
                    <>
            <div className="text-center">
                <h1 className="mb-5 h1">Add translation for <span className="text-primary">{enWord.content}</span></h1>
            </div>
            <div className="card">
     
                    <form onSubmit={handleSubmit}>
                    <div className="mt-3">
                    <Field required value={frWord}
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




        </>
    )
}

export default AddTranslationPage