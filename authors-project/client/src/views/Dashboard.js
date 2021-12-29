import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {

    const history = useHistory()
    const [authors, setAuthors] = useState([])
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8000/api/')
            .then(response => setAuthors(response.data))
            .catch(error => console.error(error));
    }, [submitted])
    

    const deleteHandler= (id) => {
        axios.delete(`http://localhost:8000/api/authors/delete/${id}`)
            .then(response => {
                setSubmitted(!submitted)
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <h1>Favorite Authors</h1>
            <Link to={`/new`}><h4>Add an author</h4></Link>
            <h4>We have quotes by:</h4>
            <table>
                <thead>
                    <th>Authors</th>
                    <th>Author Actions</th>
                </thead>
                <tbody>
                    {
                        authors.map((author, index) => {
                            return (
                                    <tr key={index}>
                                        <td>{author.name}</td>
                                        <td>
                                            <button onClick={ () => history.push(`/authors/edit/${author._id}`)}>Edit</button>
                                            <button onClick={ () => deleteHandler(author._id)}>Delete</button>
                                        </td>
                                    </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}


export default Dashboard