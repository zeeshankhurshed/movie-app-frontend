// import Navigation from '../pages/Auth/Navigation';
import { useGetNewMoviesQuery } from "../redux/api/movie";
import { Link } from "react-router-dom";
import SliderUtil from "./SliderUtil";

const Header = () => {
  const { data, isLoading, isError } = useGetNewMoviesQuery();

  if (isLoading) return <div>Loading movies...</div>;
  if (isError) return <div>Error loading movies.</div>;

  return (
    <div className="flex flex-col mt-[2rem] ml-[2rem] md:flex-row justify-between items-center md:items-start">
      <nav className="w-full md:w-[10rem] ml-0 md:ml-2 mb-4 md:mb-0">
        <Link
          to="/"
          className="transition duration-300 ease-in-out hover:bg-teal-200  block p-2 rounded mb-1 md:mb-2 text-lg"
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="transition duration-300 ease-in-out hover:bg-teal-200  block p-2 rounded mb-1 md:mb-2 text-lg"
        >
          Browse Movies
        </Link>
      </nav>

      <div className="w-full md:w-[80%] mr-0 md:mr-[2.5rem]">
        <SliderUtil data={data} />
      </div>
    </div>
  );
};

export default Header;
