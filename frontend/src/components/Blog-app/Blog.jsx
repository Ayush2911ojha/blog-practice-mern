import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import YourBlog from './YourBlog'
import AllBlogs from './AllBlogs'
import {
  Plus,
  User,
  Globe,
  Cpu,
  Plane,
  Coffee,
  Heart,
  Briefcase,
  BookOpen,
} from 'lucide-react'
import BlogBannerCarousel from './BlogBannerCarousel'

const categories = [
  { id: 'All', label: 'All', icon: Globe },
  { id: 'Technology', label: 'Tech', icon: Cpu },
  { id: 'Travel', label: 'Travel', icon: Plane },
  { id: 'Food', label: 'Food', icon: Coffee },
  { id: 'Lifestyle', label: 'Lifestyle', icon: Heart },
  { id: 'Business', label: 'Business', icon: Briefcase },
  { id: 'Education', label: 'Education', icon: BookOpen },
]

export default function Blog() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [yourBlog, setYourBlogs] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 ">
 
            <BlogBannerCarousel />

      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-10">
        <input
          type="search"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 mx-auto block px-5 py-4 rounded-full bg-white shadow-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
          aria-label="Search blogs"
        />
      </div>


      <div className="max-w-6xl mx-auto px-6 my-10 flex flex-wrap justify-center gap-4">
        {categories.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveCategory(id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition
              ${
                activeCategory === id
                  ? 'bg-indigo-600 text-white shadow-lg scale-105'
                  : 'bg-white text-indigo-600 border border-indigo-300 hover:bg-indigo-50 hover:scale-105'
              }
              transform duration-200`}
            aria-pressed={activeCategory === id}
            aria-label={`Filter by ${label} category`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>


      <div className="max-w-6xl mx-auto px-6 flex justify-center gap-8 mb-12">
        <button
          onClick={() => setYourBlogs(true)}
          className={`flex items-center gap-3 px-8 py-3 rounded-full text-sm font-semibold transition select-none
            ${
              yourBlog
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
            }
          `}
          aria-pressed={yourBlog}
          aria-label="Show your blogs"
        >
          <User size={18} />
          Your Blogs
        </button>

        <button
          onClick={() => setYourBlogs(false)}
          className={`flex items-center gap-3 px-8 py-3 rounded-full text-sm font-semibold transition select-none
            ${
              !yourBlog
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
            }
          `}
          aria-pressed={!yourBlog}
          aria-label="Show all blogs"
        >
          <Globe size={18} />
          All Blogs
        </button>
      </div>

 
      <div className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      
         {yourBlog ? (
          <YourBlog category={activeCategory} searchTerm={searchTerm} />
        ) : (
          <AllBlogs category={activeCategory} searchTerm={searchTerm} />
        )}
      </div>
    </div>
  )
}
