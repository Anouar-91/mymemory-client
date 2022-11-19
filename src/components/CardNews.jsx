import React from 'react'
import moment from 'moment';

const CardNews = ({news}) => {
    const formatDate = (str) => {
        return moment(str).format("DD/MM/YYYY, H:mm");
      }
  return (
    <div className="card-news">
    <div>
      <strong>{news.user.firstname} {news.user.lastname}</strong> a appris un nouveau mot : <strong>{news.enWord.content} !</strong> <br />
      {news.enWord.content} peut vouloir dire : {news.enWord.frWords.map((frWord) => frWord.content + ", ")}
    </div>
    <div className="d-flex justify-content-end mt-3">
      <small>{formatDate(news.createdAt)} <i className="fa-regular fa-calendar"></i></small>

    </div>

  </div>
  )
}

export default CardNews