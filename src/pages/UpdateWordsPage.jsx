import React, { useState, useEffect } from 'react';
import WordAPI from '../services/WordAPI';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'
import Field from "../components/forms/field";
import { toast } from 'react-toastify';



function UpdateWordsPage() {
    const [enWord, setEnWord] = useState();
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
            console.log(frWords)
        } catch (error) {
            console.log("error")
        }

    }

    useEffect(() => {
        fetchEnWord(id)
        if (frWords) {
            console.log(frWords.length)

        }

    }, [])
    const handleChange = (e) => {
        const { value } = e.currentTarget;
        const { name } = e.currentTarget;
        setEnWord({
            ...enWord ,
            content: value
        })
    }

    const handleChangeFrWord = (e) => {
        const { name, value } = e.currentTarget;
        let newObj = { ...frWords[name], content: value }
        setFrWords({ ...frWords, [name]: newObj })
    }

    const updateEnWord = () => {
        try {
            console.log(enWord, "handleChangeEnWord")
            const data = WordAPI.update(enWord);
            toast.success("Registered successfully");
        } catch (error) {
            console.log(error)
        }
    }

    const updateFrWord = (id, word) => {
        try {
        
            const data = WordAPI.updateFrWord(id, word);
            toast.success("Registered successfully");
        } catch (error) {
            console.log(error)
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

            ) : (
                <div>
                    <div className="text-center">
                        <h1>Update</h1>
                    </div>
                    <div className="mt-4 card">
                            <div className="row align-items-center">
                                <div className="col-10">
                                    <Field required value={enWord.content}
                                        onChange={handleChange}
                                        name="enWord"
                                        label="English word"
                                        placeholder="English word">
                                    </Field>
                                </div>
                                <div className="col-2">
                                    <button onClick={() => updateEnWord} className="btn btn-warning mt-3"><i className="fa-solid fa-pen-to-square"></i></button>
                                </div>
                            </div>

                            <label className="mt-4 h4" htmlFor="">French translation</label>
                            {copyEnWord.frWords.map((word, index) => {
                                return (
                                    <div key={index} className="row">
                                        <div className="col-10">
                                            <Field  required value={frWords[word.id].content}
                                                onChange={handleChangeFrWord}
                                                name={word.id}
                                                placeholder="French word">
                                            </Field>
                                        </div>
                                        <div className="col-2">
                                            <button onClick={() => updateFrWord(word.id, frWords[word.id].content)} className="btn btn-warning mt-3"><i className="fa-solid fa-pen-to-square"></i></button>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            )
            }
        </>
    )
}


export default UpdateWordsPage