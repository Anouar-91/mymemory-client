import React, { useEffect, useState } from 'react'
import NewsAPI from '../services/NewsAPI'
const NewsPage = () => {

  const [news, setNews] = useState([])
  const fetchNews = async () => {
    try {
      const data = await NewsAPI.findAll();
      setNews(data);
    } catch (error) {

    }
  }
  useEffect(() => {
    fetchNews();

  }, [])
  return (
    <div className="container">
      <div className="title-primary mt-3 mb-4">
        News
      </div>
      {
        news.map((news) => {
          return (
            <div className="card-news">
            <strong>{news.user.firstname} {news.user.lastname}</strong> a appris un nouveau mot : <strong>{news.enWord.content} !</strong> <br />
            {news.enWord.content} peut vouloir dire : {news.enWord.frWords.map((frWord) => frWord.content + ", ")}
          </div>
          )
        })
      }

    </div>
  )
}

export default NewsPage