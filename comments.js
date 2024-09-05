// Create web server with express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const comments = require('./comments');
const fs = require('fs');

app.use(bodyParser.json());

// Create a new comment
app.post('/comments', (req, res) => {
    if (!req.body.comment) {
        return res.status(400).send('Missing comment');
    }

    const newComment = comments.createComment(req.body.comment);

    return res.status(201).send(newComment);
});

// Get all comments
app.get('/comments', (req, res) => {
    const allComments = comments.getComments();
    return res.status(200).send(allComments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
    const comment = comments.getCommentById(req.params.id);
    if (!comment) {
        return res.status(404).send('Comment not found');
    }

    return res.status(200).send(comment);
});

// Update a comment by id
app.put('/comments/:id', (req, res) => {
    if (!req.body.comment) {
        return res.status(400).send('Missing comment');
    }

    const comment = comments.updateComment(req.params.id, req.body.comment);
    if (!comment) {
        return res.status(404).send('Comment not found');
    }

    return res.status(200).send(comment);
});

// Delete a comment by id
app.delete('/comments/:id', (req, res) => {
    const comment = comments.deleteComment(req.params.id);
    if (!comment) {
        return res.status(404).send('Comment not found');
    }

    return res.status(204).send();
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});