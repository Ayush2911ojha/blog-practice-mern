const Comment = require("../models/commentSchema");


const AddComment = async(req, res) => {

    try {
           
        const { comments,userId } = req.body;
        const comment = new Comment({
            comments,
            userId
        })

        const savedComment = await comment.save();

         res.status(201).json({
      message: "comment saved successfully",
      comment: savedComment,
    });
        
       } catch (error) {
        console.log('Error saving comment', error);
        res.status(500).json({ message: 'Internal server error' } )
       }
}

const getAllComments = async(req,res) => {
    
  try {
         const allComments = await Comment.find();
    if (!allComments || allComments.length == 0) {
        res.status(200).json({ message: "No comments Found",comments:[]})
    }
    else {
        res.status(200).json({ message: "fetched comments sunccesfully", comments: allComments });
     }
  } catch (error) {
      console.log("server error in fethcing all comments", error);
  }
} 

module.exports = { AddComment,getAllComments };