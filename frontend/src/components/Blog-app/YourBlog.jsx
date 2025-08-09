import React, { useEffect, useState, useMemo } from 'react';
import { getUserId } from '../../utils/getUserId';
import BlogCard from './BlogCard';

const YourBlog = ({ category, searchTerm }) => {
  const [userBlogs, setUserBlogs] = useState([]);
  const userId = React.useMemo(() => getUserId(), []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/user-blogs/${userId}`);
        const userBlog = await res.json();
        if (userBlog?.blog) {
          setUserBlogs(userBlog.blog);
        } else {
          console.log("error in userfetch");
        }
      } catch (error) {
        console.log("Fetching User Blogs error", error);
      }
    };
    fetchBlogs();
  }, [userId]);

  const filteredBlogs = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return userBlogs.filter(blog => {
      const matchesCategory = category === 'All' || blog.category === category;
      const matchesSearch =
        blog.title?.toLowerCase().includes(lowerSearch) ||
        blog.excerpt?.toLowerCase().includes(lowerSearch) ||
        blog.author?.toLowerCase().includes(lowerSearch);
      return matchesCategory && matchesSearch;
    });
  }, [userBlogs, category, searchTerm]);

  if (filteredBlogs.length === 0) {
    return (
      <div className="py-10 min-h-screen text-center text-xl text-neutral-400 font-semibold">
        No blogs found.
      </div>
    );
  }

  return (
    < >
      {filteredBlogs.map(blog => (
        <BlogCard
          key={blog._id}
          blog={blog}
          onDelete={(deletedId) => setUserBlogs(prev => prev.filter(b => b._id !== deletedId))}
        />
      ))}
    </>
  );
};

export default YourBlog;
