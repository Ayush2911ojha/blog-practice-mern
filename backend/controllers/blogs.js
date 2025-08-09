const Blog = require('../models/blogSchema');

const AddBlog = async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      image,
      excerpt,
      content,
      userId,
    } = req.body;

    // console.log("userid from addBlog", userId);

    const newBlog = new Blog({
      title,
      author,
      category,
      image,
      excerpt,
      content,
      userId,
    });

    const savedBlog = await newBlog.save();

    res.status(201).json({
      message: "Blog saved successfully",
      blog: savedBlog,
    });
  } catch (error) {
    console.error("Error saving blog:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getUserBlogs = async (req, res) => { 
    const userId = req.params.user;
    console.log(userId,"frombacknedfro")
   
    try {

        const userBlogs = await Blog.find({ userId });
        if (!userBlogs || userBlogs.length==0) {
            res.status(200).json({ message: 'No blogs found for this user', blog: [] })
        }
        else { 
            
            res.status(200).json({ message: "Blogs fetched", blog: userBlogs });
        }
        
    } catch (error) {
        console.log("fetching user blog from database",error)
    }
} 

const getAllBlogs = async(req,res) => {
    
  try {
         const allBlog = await Blog.find();
    if (!allBlog || allBlog.length == 0) {
        res.status(200).json({ message: "No Blogs Found",blog:[]})
    }
    else {
        res.status(200).json({ message: "fetched blogs sunccesfully", blog: allBlog });
     }
  } catch (error) {
      console.log("server error in fethcing all blogs", error);
  }
} 
 
const deleteBlog = async (req, res) => { 

 try {
    const blogId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server error" });
  }

}
const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog" });
  }
};

 
const findForEdit = async (req,res) => { 
     
     try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog" });
  }

}



module.exports = { AddBlog,getUserBlogs,getAllBlogs,deleteBlog,updateBlog,findForEdit};
