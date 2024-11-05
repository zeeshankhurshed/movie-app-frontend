import { useState } from "react";
import {
    useGetNewMoviesQuery,
    useGetTopMoviesQuery,
    useGetRandomMoviesQuery,
} from '../../redux/api/movie';
import { useFetchGenreQuery } from '../../redux/api/genre';
import SliderUtil from "../../components/SliderUtil";

function MovieContainerPage() {
    const { data: newMovies } = useGetNewMoviesQuery();
    const { data: topMovies } = useGetTopMoviesQuery();
    const { data: randomMovies } = useGetRandomMoviesQuery();
    const { data: genres } = useFetchGenreQuery();
    const [selectedGenre, setSelectedGenre] = useState(null);

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId);
    };

    const filteredMovies = newMovies?.filter(
        (movie) => selectedGenre === null || movie.genre === selectedGenre
    );

    return (
        <div className="flex flex-col lg:flex-row lg:justify-between items-center ">
            <nav className="ml-16 flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row">
                {genres?.all.map((genre) => (
                    <button
                        key={genre._id}
                        className={`transition duration-300 ease-in-out hover:bg-gray-200 block p-2 rounded mb-4 text-lg ${
                            selectedGenre === genre._id ? "bg-gray-200" : ""
                        }`}
                        onClick={() => handleGenreClick(genre._id)}
                    >
                        {genre.name}
                    </button>
                ))}
            </nav>

            <section className="flex flex-col justify-center items-center w-full overflow-hidden">
        <div className="w-full lg:w-[80rem] mb-8 ">
          <h1 className="mb-5">Choose For You</h1>
          <SliderUtil data={randomMovies} />
        </div>

        <div className="w-full lg:w-[80rem] mb-8">
          <h1 className="mb-5">Top Movies</h1>
          <SliderUtil data={topMovies} />
        </div>

        <div className="w-full lg:w-[80rem] mb-8">
          <h1 className="mb-5">Choose Movie</h1>
          <SliderUtil data={filteredMovies} />
        </div>
      </section>
        </div>
    );
}

export default MovieContainerPage;
