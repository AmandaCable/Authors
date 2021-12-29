import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import axios from "axios"

const Edit = () => {
    const { id } = useParams()
    const history = useHistory()

    const [name, setName] = useState()

    const [loaded, setLoaded] = useState(false)

    //create an array to store errors from api
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        console.log(id)
        // MAKE A REQUEST TO THE BACKEND TO RETRIEVE ONE BOOK
        axios.get(`http://localhost:8000/api/authors/${id}`)
            .then(res => {
                console.log(res.data)
                setName(res.data.name)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [])

    const submitHandler = event => {
        event.preventDefault()
        const postData = {
            name
        }
        axios.put(`http://localhost:8000/api/authors/edit/${id}`, postData)
            .then(response => {
                console.log(response.data)
                history.push('/')
            })
            .catch(error => {
                const errorResponse = error.response.data.errors;
                const errorArray = []
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArray.push(errorResponse[key].message)
                }
                setErrors(errorArray)
            })
    }

    return (
        <div>
            <h1>Favorite Authors</h1>
            <Link to={`/`}><h4>Home</h4></Link>
            <h4>Edit this author</h4>
            <form onSubmit={submitHandler}>
                {
                    (loaded) ?
                    <div>
                        <p>
                            Name:
                            <input type="text" name="" value={name} onChange={event => setName(event.target.value)} />
                        </p>
                        <button onClick={() => history.push(`/`)}>Cancel</button>
                        <button onClick={() => history.push(`/authors/edit/${id}`)}>Update</button>
                    </div> : <h1>Loading...</h1>
                }
            </form>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
        </div>
    )
}

export default Edit