const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRoutes = require('./router/blogRoutes');
const commentRouter = require('./router/commentRoutes');

const app = express();
const PORT = 5000;

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/blogDB');
    console.log('Mongo db connected');
  } catch (err) {
    console.error('Mongodb connection error:', err);
   
  }
};

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRoutes);
app.use('/api/blogs/comment',commentRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
