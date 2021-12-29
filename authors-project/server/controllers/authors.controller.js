
const Author  = require('../models/author.model');

module.exports.test= (request, response) => {
    response.json( "Hello World");
}

// CREATE
module.exports.createAuthor= (request, response) => {
    Author.create(request.body)
        .then(newAuthor => response.json(newAuthor))//success
        .catch(error => {
            console.log("Validations have failed")
            response.status(400).json(error)
        })
}

// READ
module.exports.allAuthors = (request, response) => {
    Author.find().sort({name: 1})
        .then(allAuthors => response.json(allAuthors))
        .catch(error => response.json(error))
}

module.exports.oneAuthor = (request, response) => {
    const {id} = request.params
    Author.findOne({_id : id})
        .then(oneAuthor => response.json(oneAuthor))
        .catch(error => response.json(error))
}

// UPDATE
module.exports.updateAuthor = (request, response) => {
    const {id} = request.params
    Author.findByIdAndUpdate({_id : id}, request.body, {runValidators:true, new:true})
        .then(updateAuthor => response.json(updateAuthor))
        .catch(error => {
            console.log("Validations have failed")
            response.status(400).json(error)
        })
}

// DELETE
module.exports.deleteAuthor = (request, response) => {
    const {id} = request.params
    Author.deleteOne({_id: id})
        .then(deleteName => response.json(deleteName))
        .catch(error => response.json(error))
}
