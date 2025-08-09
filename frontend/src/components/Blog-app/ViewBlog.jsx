import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ViewBlog = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const blog = location?.state?.blog

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No blog data found.</p>
      </div>
    )
  }

  const {
    _id,
    author,
    category,
    content,
    createdAt,
    excerpt,
    image,
    title,
  } = blog

  return (
    <article className="max-w-5xl mx-auto my-10 bg-white rounded-3xl shadow-md overflow-hidden select-none p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-indigo-600 hover:underline"
      >
        &larr; Back
      </button>

      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-2xl mb-6"
        draggable={false}
      />

      <div className="mb-4 flex items-center gap-3 text-sm text-indigo-600 font-semibold uppercase">
        <span>{category}</span>
        <span>•</span>
        <time dateTime={new Date(createdAt).toISOString()}>
          {new Date(createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </time>
      </div>

          <h1 className="text-3xl font-bold text-neutral-900 mb-4">{title}</h1>
            <p className="text-gray-400 leading-relaxed whitespace-pre-line mb-3">{excerpt}</p>

      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{content || excerpt}</p>

      <p className="mt-6 text-sm text-gray-500">Author: {author || 'Unknown'}</p>
    </article>
  )
}

export default ViewBlog
