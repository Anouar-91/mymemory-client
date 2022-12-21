import React, { useState, useEffect } from 'react';
import WordAPI from '../services/WordAPI';
import { useParams, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'
import Field from "../components/forms/field";
import { toast } from 'react-toastify';



function UpdateWordsPage() {
    const [enWord, setEnWord] = useState();
    const navigate = useNavigate();
    const [copyEnWord, setCopyEnWord] = useState();
    const [frWords, setFrWords] = useState();
    const [loading, setLoading] = useState(true)
    let { id } = useParams();

    const fetchEnWord = async (id) => {
        try {
            const data = await WordAPI.find(id);
            setEnWord(data);
            setCopyEnWord(data);
            let table = {}
            data.frWords.forEach(word => {
                table[word.id] = word
            })
            setFrWords(table);
            setLoading(false);
        } catch (error) {
            if (error.response.status == 401) {
                toast.error("You are no longer connected!")
                navigate("/login");
              }else{
                toast.error("Error !")
              }
        }

    }

    useEffect(() => {
        fetchEnWord(id)

    }, [])
    const handleChange = (e) => {
        const { value } = e.currentTarget;
        setEnWord({
            ...enWord,
            content: value
        })
    }

    const handleChangeFrWord = (e) => {
        const { name, value } = e.currentTarget;
        let newObj = { ...frWords[name], content: value }
        setFrWords({ ...frWords, [name]: newObj })
    }

    const updateEnWord = async () => {
        setLoading(true)
        const enWordCopy = enWord.content;
        setEnWord({
            ...enWord,
            content : enWordCopy
        })
        try {

            await WordAPI.update(enWord);
            toast.success("Registered successfully");
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const updateFrWord = async (id, word) => {
        setLoading(true)

        try {
            await WordAPI.updateFrWord(id, word);
            toast.success("Registered successfully");
            setLoading(false)

        } catch (error) {
            setLoading(false)

        }
    }

    const deleteFrWord = async (idFr, idEn) => {
        setLoading(true)
        try {
            await WordAPI.deleteFrWord(idFr, idEn);
            toast.success("Deleted successfully");
            navigate('/en_words')
            setLoading(false)


        } catch (error) {
            setLoading(false)


        }
    }

    return (
        <>
            <div className="container">


                {loading ? (
                    <div className="text-center">
                        <ThreeDots
                            color="#C30028"
                            wrapperStyle={{ justifyContent: 'center' }}
                        />
                    </div>

                ) : (
                    <div>
                        <div className="title-primary mt-3 mb-4">
                            Update
                        </div>
                        <div className="mt-4">
                            <div className="row align-items-end">
                                <div className="col-10">
                                    <label className="mt-4 h4" htmlFor="">English word</label>

                                    <Field required value={enWord.content}
                                        onChange={handleChange}
                                        className="input-shadow-secondary"
                                        name="enWord"
                                        placeholder="English word">
                                    </Field>
                                </div>
                                <div className="col-2">
                                    <button onClick={() => {  updateEnWord()}} className="btn btn-warning mt-3"><i className="fa-solid fa-pen-to-square"></i></button>
                                </div>
                            </div>

                            <label className="mt-4 h4" htmlFor="">French translation</label>
                            {copyEnWord.frWords.map((word, index) => {
                                return (
                                    <div key={index} className="row">
                                        <div className="col-10">
                                            <Field required value={frWords[word.id].content}
                                                onChange={handleChangeFrWord}
                                                name={word.id}
                                                className="input-shadow-secondary"

                                                placeholder="French word">
                                            </Field>
                                        </div>
                                        <div className="col-2">
                                            <div className="d-flex">

                                                <button onClick={() => updateFrWord(word.id, frWords[word.id].content)} className="btn btn-warning mt-3"><i className="fa-solid fa-pen-to-square"></i></button>&nbsp; &nbsp;

                                                {copyEnWord.frWords.length > 1 && <button onClick={() => deleteFrWord(word.id, enWord.id)} className="btn btn-danger mt-3"><i className="fa-solid fa-trash-can"></i></button>}
                                            </div>



                                        </div>

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
                }
            </div>
        </>
    )
}


export default UpdateWordsPage