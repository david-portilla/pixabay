import React from 'react'
import {useState} from 'react'
import Error from './Error'


const Form = () => {
  const [term, saveTerm] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    // validate form
    if(term.trim() === '') {
      setError(true)
      return
    }
    setError(false)

    // send term to api

  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search for an image, ej: Soccer or mountain"
            onChange={e => saveTerm(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Search"
          />
        </div>
      </div>

      {error ? <Error message='Please submit a term for search' /> : null}

    </form>
  )
}

export default Form
