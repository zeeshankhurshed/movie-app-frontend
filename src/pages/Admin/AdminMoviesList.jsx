import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movie";

export default function AdminMoviesList() {
  const { data: movies, isLoading, isError } = useGetAllMoviesQuery();
  
  console.log('movies', movies); // Confirm that movies is an array here

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (isError || !movies || movies.length === 0) return <div className="text-center py-8">No movies found.</div>;

  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <div className="text-center text-2xl font-semibold mb-8">
        All Movies ({movies.length})
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-1 border-slate-300 shadow-lg">
        {movies.map((movie) => (
          <div key={movie._id} className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={movie.image}
              alt={movie.name}
              className="w-full h-56 object-fill"
            />
            <div className="px-6 py-4">
              <h2 className="font-bold text-xl mb-2 text-gray-800">{movie.name}</h2>
              <p className="text-gray-600 text-base mb-4">{movie.detail}</p>
              <div className="text-center">
                <Link 
                  to={`/admin/movies/update/${movie._id}`}
                  className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Update Movie
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
