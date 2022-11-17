import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import WordAPI from '../services/WordAPI';
import ModalEnWord from '../components/ModalEnWord';
import enwordIllustration from '../assets/img/enWord-illustration.png';

export default function EnWordPage() {

    const [enWords, setEnWords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true)
    const [rate, setRate] = useState(0)
    const [wordModal, setWordModal] = useState({ content: "", frWords: [], id: 1, nbError: 0, nbSuccess: 0 });
    const [mostMistakeWord, setMostMistakeWord] = useState([]);


    const fetchEnWords = async () => {
        try {
            const data = await WordAPI.findAll();
            const result = await WordAPI.getRate()
            setRate(result);
            setEnWords(data)
            setLoading(false)
        } catch (error) {
            toast.error("An error occurred while loading clients")
        }
    }

    const openMistakeWord = () => {
        const tab = [];
        enWords.forEach(word => {
            if (word.nbSuccess < word.nbError) {
                if (tab.length < 10) {
                    tab.push(word)
                }
            }
        })
        setMostMistakeWord(tab)
        console.log(tab);
    }
    const handleClickModal = (word) => {
        setWordModal(word)
    }
    const handleDelete = async (id) => {
        const myModal = document.querySelector('.btn-close');
        myModal.click()
        const copyWords = [...enWords];
        setEnWords(enWords.filter(word => word.id !== id))
        try {
            await WordAPI.delete(id)
        } catch (error) {
            toast.error("An error has occurred")
            setEnWords(copyWords);
        }
    };

    useEffect(() => {
        fetchEnWords();
    }, [])

    const handleChangePage = (page) => {
        setCurrentPage(page)
    }

    const handleSearch = e => {
        const value = e.currentTarget.value;
        setSearch(value)
        setCurrentPage(1)
    }

    const itemsPerPage = 10;

    const filteredEnWords = enWords.filter(
        word =>
            word.content.toLowerCase().includes(search.toLowerCase())
    )

    const start = currentPage * itemsPerPage - itemsPerPage
    const paginatedWords = filteredEnWords.slice(start, start + itemsPerPage);

    return (
        <>

            <div className="container mt-3">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-8">
                        <div className="title-table-enword text-light d-flex justify-content-space-around align-items-center">
                            <h1>List of words</h1>
                            <Link to="/en_words/new" className="btn btn-primary">New word</Link>
                        </div>
                        <div className="form-group mb-5 mt-5">
                            <input type="text" placeholder="Search..." value={search} onChange={handleSearch} className="form-control input-shadow" />
                        </div>
                        {!loading &&
                            <button onClick={() => openMistakeWord()} type="button" class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#mostErrorList">
                                See the words you make the most mistakes on
                            </button>
                        }

                    </div>
                    <div className="col-md-4">
                        <img src={enwordIllustration} className="img-fluid" alt="" />
                    </div>
                </div>
                {!loading ? (
                    <>
                        <div className="progress mt-3">
                            <div className="progress-bar" role="progressbar" aria-label="Example with label" style={{ width: `${rate}%` }} aria-valuenow={rate} aria-valuemin="0" aria-valuemax="100">{rate}%</div>
                        </div>

                        <div className="table-book">
                            <div className="d-flex">
                                <div className="col-6">
                                    <div className="head">English word</div>
                                </div>
                                <div className="col-6">
                                    <div className="head">French word</div>
                                </div>
                            </div>

                            {paginatedWords.map((word) =>
                                <>
                                    <div key={word.id} data-bs-toggle="modal" onClick={() => handleClickModal(word)} data-bs-target={"#wordModal"} className="d-flex lineWord">
                                        <div className="col-6 right-line">
                                            <div className="word">{word.content}</div>
                                        </div>
                                        <div className="col-6">
                                            <div className="word">{word.frWords.map((frWord) => frWord.content + ", ")}</div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {<ModalEnWord word={wordModal} handleDelete={handleDelete} />}



                        </div>
                    </>

                ) : (
                    <div className="text-center">
                        <ThreeDots
                            color="#C30028"
                            wrapperStyle={{ justifyContent: 'center' }}
                        />
                    </div>

                )}
                <div className="mb-5">
                    <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredEnWords.length} onPageChange={handleChangePage} />

                </div>
            </div>
            <div class="modal fade" id="mostErrorList" tabindex="-1" aria-labelledby="mostErrorList" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 className="modal-title text-third text-center" id="exampleModalLabel">Words on which you made more mistakes than successes</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="tab-modal">
                                <div className="d-flex">
                                    <div className="col-6">
                                        <div className="head">English word</div>
                                    </div>
                                    <div className="col-6">
                                        <div className="head">French word</div>
                                    </div>
                                </div>
                                {mostMistakeWord.map((word) =>
                                    <>
                                        <div className="d-flex lineWord">
                                            <div className="col-6">
                                                <div className="word">{word.content}</div>
                                            </div>
                                            <div className="col-6">
                                                <div className="word">{word.frWords.map((frWord) => frWord.content + ", ")}</div>
                                            </div>
                                        </div>
                                    </>
                                )}

                            </div>

                        </div>
                        <div class="modal-footer text-center">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
