import React, {useState, useEffect} from 'react';
import Form from './Components/Form';
import ListImages from './Components/ListImages';

function App () {

  const [searchTerm, saveResult] = useState('')
  const [images, setImages] = useState([])
  const [currentPAge, setCurrentPAge] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {

    const requestApi = async () => {
      if(searchTerm === '') return
      const amountImage = 30
      const KEY = '20842004-1e614783a52a92aa8bd52a7d8'
      const URL = `https://pixabay.com/api/?key=${ KEY }&q=${ searchTerm }&per_page=${ amountImage }`
      const request = await fetch(URL)
      const response = await request.json()
      setImages(response.hits)
      setTotalPages(Math.ceil(response.totalHits / amountImage))
    }
    requestApi()
  }, [searchTerm])

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Search for images</p>
        <Form saveResult={saveResult} />
      </div>

      <div className="row justify-content-center">
        {images && <ListImages images={images}></ListImages>}
      </div>
    </div>
  );
}

export default App;
