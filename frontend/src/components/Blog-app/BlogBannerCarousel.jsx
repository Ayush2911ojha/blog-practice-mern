import Slider from "react-slick"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

const slides = [
  {
    id: 1,
    title: "Discover Stories That Inspire You",
    subtitle: "Connect with passionate bloggers and explore diverse topics.",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Explore The Latest Technology Trends",
    subtitle: "Stay updated with insights and innovations in tech.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1170&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Travel The World Through Blogs",
    subtitle: "Get inspired by travel stories and tips from around the globe.",
    img: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
]

export default function BlogBannerCarousel() {
  const navigate = useNavigate()

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
      arrows: true,
    
    pauseOnHover: true,
  }

  return (
    <div className="max-w-full mx-auto overflow-hidden" >
      <Slider {...settings}>
        {slides.map(({ id, title, subtitle, img }) => (
          <div key={id}>
            <div
              className="relative h-96 bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${img})` }}
            >
              
              <div className="relative text-center px-6 max-w-4xl text-white">
                <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">{title}</h1>
                <p className="text-lg mb-6 drop-shadow-md">{subtitle}</p>
                <button
                  onClick={() => navigate("/create-blog")}
                  className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-full font-semibold shadow-lg"
                >
                  <Plus size={20} />
                  Write a Blog
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}
