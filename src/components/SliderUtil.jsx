import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movies/MovieCard";

export default function SliderUtil({ data }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Check if data is an array
  if (!Array.isArray(data)) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return (
    <div className="">
    <Slider {...settings}>
      {data.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </Slider>
      </div>
  );
}