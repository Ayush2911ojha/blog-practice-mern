const express = require('express');
const { AddComment, getAllComments } = require('../controllers/comments');
const router = express.Router();


router.post('/add-comment', AddComment)
      .get('/all-comments', getAllComments);

module.exports= router