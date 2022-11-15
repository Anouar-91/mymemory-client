import React, { useEffect, useState } from 'react'
import NewsAPI from '../services/NewsAPI';
import CardNews from '../components/CardNews';

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
            <CardNews news={news}/>
          )
        })
      }

    </div>
  )
}

export default NewsPage