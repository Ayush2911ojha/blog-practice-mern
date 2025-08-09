import { useForm } from 'react-hook-form';
import { getUserId } from '../../utils/getUserId';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBigLeftIcon, CheckCircle, CircleOffIcon, UserCheck } from 'lucide-react';

const categories = [
  "Technology", "Travel", "Food", "Lifestyle", "Business", "Education",
];

const CreateBlog = () => {
  const blogId = useParams(); 
  const { handleSubmit, register, reset, setValue } = useForm();
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  let userId = Math.random().toString(36).substring(2, 6); 

  useEffect(() => {
    if (blogId.id) {
      fetch(`http://localhost:5000/api/blogs/edit-blog/${blogId.id}`)
        .then(res => res.json())
        .then(data => {
        
          reset({
            title: data.title,
            author: data.author,
            category: data.category,
            image: data.image,
            excerpt: data.excerpt,
            content: data.content,
          });
        })
        .catch(err => console.error(err));
    }
  }, [blogId.id, reset]);

  useEffect(() => { 
    if (admin) {
      userId = getUserId();
    } else { 
      userId = Math.random().toString(36).substring(2, 6); 
    }
  }, [admin]);

  const onSubmit = async (formData) => { 
    try {
      const url = blogId.id
        ? `http://localhost:5000/api/blogs/update-blog/${blogId.id}`
        : `http://localhost:5000/api/blogs/add-blog`;

      const method = blogId.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...formData, userId }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(blogId.id ? "Blog updated successfully" : "Blog created successfully");
        if (!blogId.id) reset();
        setTimeout(() => navigate('/'), 1500);
      } else {
        setMessage(`Failed: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Something went wrong", error);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div onClick={() => navigate('/')} className='flex gap-2 items-center font-bold text-red-500 cursor-pointer mb-2'>
        <ArrowBigLeftIcon color='blue' size={28}/>
        Back
      </div>
      <h2 className="text-2xl font-bold mb-6">
        {blogId.id ? "Edit Blog" : "Create a New Blog"}
      </h2>
      {message && (
        <p className="mb-4 text-center font-medium text-green-600">{message}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <button
          type="button"
          className="text-black flex items-center bg-yellow-200 rounded-2xl px-3 py-2 w-28 mb-2"
          onClick={() => setAdmin((prev) => !prev)}
        >
          <UserCheck/>
          {admin ? <CheckCircle color='green' size={20}/> : <CircleOffIcon size={20} color='red'/>}
        </button>

        <div>
          <label className="block text-gray-700 mb-1">Blog Title</label>
          <input {...register('title', { required: true })} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Author</label>
          <input {...register('author', { required: true })} className="w-full border border-gray-300 rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Category</label>
          <select {...register('category', { required: true })} className="w-full border border-gray-300 rounded px-3 py-2">
            <option value="">Choose Category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Thumbnail/Image URL</label>
          <input {...register('image')} className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Paste image URL (Unsplash recommended)" />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Short Intro (Excerpt)</label>
          <input {...register('excerpt', { required: true })} className="w-full border border-gray-300 rounded px-3 py-2" maxLength={100} placeholder="Short one-line summary" />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Content</label>
          <textarea {...register('content', { required: true })} className="w-full border border-gray-300 rounded px-3 py-2 h-32" />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {blogId.id ? "Update Blog" : "Add Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
