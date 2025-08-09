import { useNavigate } from "react-router-dom";
import { Trash2, Edit3, Clock } from "lucide-react";

const estimateReadingTime = (text) => {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
};

const BlogCard = ({ blog, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/blogs/delete-blog/${blog._id}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (res.ok) {
        onDelete(blog._id);
      } else {
        console.error("Delete failed:", data.message);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleReadMore = () => {
    navigate(`/view-blog/${blog._id}`, { state: { blog } });
  };

  const readingTime = estimateReadingTime(blog.excerpt || blog.content || "");

  return (
    <article className="flex flex-col h-full bg-white rounded-3xl shadow-md hover:shadow-xl transition p-5 cursor-pointer select-none">
      <img
        src={blog.image || "https://via.placeholder.com/400x200?text=No+Image"}
        alt={blog.title}
        className="w-full h-48 object-cover rounded-2xl mb-4"
      />
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-indigo-600 uppercase select-none">
            {blog.category || "General"}
          </span>
          <span className="flex items-center text-xs text-indigo-600 select-none gap-1">
            <Clock size={14} /> {readingTime} min read
          </span>
        </div>

        <h3
          className="text-lg font-bold text-neutral-900 mb-3 line-clamp-2"
          title={blog.title}
        >
          {blog.title}
        </h3>

        <p className="text-sm text-neutral-600 flex-1 mb-5 line-clamp-3">
          {blog.excerpt || "No description available."}
        </p>

        <div className="flex justify-between items-center text-xs text-neutral-400 mb-4">
          <span>by {blog.author || "Unknown"}</span>
          <time dateTime={blog.createdAt}>
            {new Date(blog.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </time>
        </div>

        <div className="flex gap-3 mt-auto">
             <div className="flex justify-end gap-4 pt-3 border-t border-gray-100">
          <button
            onClick={()=>navigate(`/edit-blog/${blog._id}`)}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold text-sm transition"
            aria-label={`Edit blog titled ${blog.title}`}
            type="button"
          >
            <Edit3 size={16} />
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold text-sm transition"
            aria-label={`Delete blog titled ${blog.title}`}
            type="button"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>

          <button
            onClick={handleReadMore}
            className="ml-auto text-indigo-600 hover:underline font-medium text-xs"
            aria-label={`Read more about ${blog.title}`}
          >
            Read More
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
