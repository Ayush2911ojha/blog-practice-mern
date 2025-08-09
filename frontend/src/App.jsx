import React from 'react'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom'
import Blog from './components/Blog-app/Blog'
import CreateBlog from './components/Blog-app/CreateBlog'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ViewBlog from './components/Blog-app/ViewBlog'

const App = () => {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<Blog />} />
       <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/edit-blog/:id" element={<CreateBlog />} />
         <Route path="/view-blog/:id" element={<ViewBlog/>} />

      </Routes>
    </Router>
    
  )
}

export default App