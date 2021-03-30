import React, {useState, useEffect} from 'react';
import Form from './Components/Form';
import ListImages from './Components/ListImages';

function App () {

  const [searchTerm, saveResult] = useState('')
  const [images, setImages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(5)

  useEffect(() => {

    const requestApi = async () => {
      if(searchTerm === '') return
      const amountImage = 30
      const KEY = '20842004-1e614783a52a92aa8bd52a7d8'
      const URL = `https://pixabay.com/api/?key=${ KEY }&q=${ searchTerm }&per_page=${ amountImage } &page=${ currentPage }`
      const request = await fetch(URL)
      const response = await request.json()
      setImages(response.hits)
      setTotalPages(Math.ceil(response.totalHits / amountImage))
      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({behavior: 'smooth'})
    }
    requestApi()
  }, [searchTerm, currentPage])

  const previousPage = () => {
    const newCurrentPage = currentPage - 1
    if(newCurrentPage === 0) return
    setCurrentPage(newCurrentPage)
  }

  const nextPage = () => {
    const newCurrentPage = currentPage + 1
    if(newCurrentPage > totalPages) return
    setCurrentPage(newCurrentPage)
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Search for images</p>
        <Form saveResult={saveResult} />
      </div>
      <div className="row justify-content-center">
        {images && <ListImages images={images}></ListImages>}
        {(currentPage === 1) ? null : (
          <button
            className="bbtn btn-info mr-1 mb-5"
            onClick={previousPage}
          >
            &laquo; Back
          </button>
        )}
        {(currentPage === totalPages) ? null : (
          <button
            onClick={nextPage}
            className="bbtn btn-info mb-5">
            Next &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
