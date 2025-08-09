import React, { useEffect, useState, useMemo } from 'react';
import BlogCard from './BlogCard';

const AllBlogs = ({ category, searchTerm }) => {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/blogs/all-blogs');
        const data = await res.json();
        if (data?.blog) {
          setAllBlogs(data.blog);
        } else {
          console.log("no blogs returned");
        }
      } catch (error) {
        console.log("error in fetching all blogs", error);
      }
    };
    getAllBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return allBlogs.filter(blog => {
      const matchesCategory = category === 'All' || blog.category === category;
      const matchesSearch =
        blog.title?.toLowerCase().includes(lowerSearch) ||
        blog.excerpt?.toLowerCase().includes(lowerSearch) ||
        blog.author?.toLowerCase().includes(lowerSearch);
      return matchesCategory && matchesSearch;
    });
  }, [allBlogs, category, searchTerm]);

  if (filteredBlogs.length === 0) {
    return (
      <div className="py-10 text-center text-xl text-neutral-400 font-semibold">
        No blogs found.
      </div>
    );
  }

  return (
    <>
      {filteredBlogs.map(blog => (
        <BlogCard
          key={blog._id}
          blog={blog}
          onDelete={(deletedId) => setAllBlogs(prev => prev.filter(b => b._id !== deletedId))}
        />
      ))}
    </>
  );
};

export default AllBlogs;
