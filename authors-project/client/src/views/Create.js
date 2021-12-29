import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios';

const Create = () => {
    const history = useHistory()

    // what is being typed via useState hook
    const [name, setName] = useState();

    // create an array to store errors from the API
    const [errors, setErrors] = useState([]); 

    // handler when the form is submitted
    const onSubmitHandler = event => {
        // prevent default behavior of the submit
        event.preventDefault();
        console.log("Form Submitted")
        // post request to create a new product
        const postData = {
            name
        }
        axios.post('http://localhost:8000/api/new', postData)
        .then(response => {
            history.push("/")
        })
        .catch(error => {
            const errorResponse = error.response.data.errors; //gets error from error.reponse.data
            const errorArray = []; //define temp error array to push the messages
            for (const key of Object.keys(errorResponse)){ //loop through all errors and get the messages
                errorArray.push(errorResponse[key].message)
            }
            setErrors(errorArray) //set error
        })
    }

    return (
        <div>
            <h1>Favorite Authors</h1>
            <h4>Add a new author:</h4>
                        <form onSubmit={onSubmitHandler}>
                            <p>
                                Name:
                                <input type="text" name="" onChange={event => setName(event.target.value)} />
                            </p>
                            <button>Create</button>
                        </form>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
        </div>
    )
}

export default Create