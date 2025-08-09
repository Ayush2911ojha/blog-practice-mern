const express = require('express');
const router = express.Router();
const { AddBlog, getUserBlogs, getAllBlogs,deleteBlog,updateBlog,findForEdit } = require('../controllers/blogs');


router.post('/add-blog', AddBlog);
router.get('/user-blogs/:user', getUserBlogs);
router.get('/all-blogs', getAllBlogs);
router.delete('/delete-blog/:id', deleteBlog);
router.put('/update-blog/:id', updateBlog);
router.get('/edit-blog/:id', findForEdit);
module.exports = router;
