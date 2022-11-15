import React, { useEffect, useState } from 'react'
import NewsAPI from '../services/NewsAPI';
import moment from 'moment';

const NewsPage = () => {

  const [news, setNews] = useState([])
  const fetchNews = async () => {
    try {
      const data = await NewsAPI.findAll();
      setNews(data);
    } catch (error) {

    }
  }
  const formatDate = (str) => {
    return moment(str).format("DD/MM/YYYY, H:mm");
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
              <div>
              <strong>{news.user.firstname} {news.user.lastname}</strong> a appris un nouveau mot : <strong>{news.enWord.content} !</strong> <br />
            {news.enWord.content} peut vouloir dire : {news.enWord.frWords.map((frWord) => frWord.content + ", ")}
              </div>
              <div className="d-flex justify-content-end mt-3">
              <small>{formatDate(news.createdAt)} <i class="fa-regular fa-calendar"></i></small>

              </div>

          </div>
          )
        })
      }

    </div>
  )
}

export default NewsPage