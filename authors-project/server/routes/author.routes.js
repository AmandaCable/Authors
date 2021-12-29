const AuthorController = require('../controllers/authors.controller');

module.exports = function(app){
    app.get('/api/test', AuthorController.test);
    // Create
    app.post('/api/new', AuthorController.createAuthor);
    // Read
    app.get('/api/', AuthorController.allAuthors);
    app.get('/api/authors/:id', AuthorController.oneAuthor);
    // Update
    app.put('/api/authors/edit/:id/', AuthorController.updateAuthor);
    // Delete
    app.delete('/api/authors/delete/:id', AuthorController.deleteAuthor);
}