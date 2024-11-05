import { apiSlice } from './apiSlice';
import { MOVIE_URL, UPLOAD_URL } from '../constant';

export const movieApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllMovies: builder.query({
            query: () => `${MOVIE_URL}/allMovies`,
        }),
        createMovies: builder.mutation({
            query: (newMovie) => ({
                url: `${MOVIE_URL}/createMovie`,
                method: 'POST',
                body: newMovie,
            }),
        }),
        updateMovie: builder.mutation({
            query: ({ id, updatedMovie }) => ({
                url: `${MOVIE_URL}/updateMovie/${id}`,
                method: 'PUT',
                body: updatedMovie,
            }),
        }),
        addMovieReview: builder.mutation({
            query: ({ id, rating, comment }) => ({
                url: `${MOVIE_URL}/${id}/reviews`,
                method: 'POST',
                body: { rating,id, comment },
            }),
        }),
        deleteComment: builder.mutation({
            query: ({ movieId, reviewId }) => ({
              url: `${MOVIE_URL}/deleteComment/${movieId}`,
              method: "DELETE",
              body: { movieId, reviewId },
            }),
          }),
        
        deleteMovie: builder.mutation({
            query: (id) => ({
                url: `${MOVIE_URL}/deleteMovie/${id}`,
                method: 'DELETE',
            }),
        }),
        getSpecificMovie: builder.query({
            query: (id) => `${MOVIE_URL}/specificMovie/${id}`,
        }),
        uploadImage: builder.mutation({
            query: (formData) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: formData,
            }),
        }),
        getNewMovies: builder.query({
            query: () => `${MOVIE_URL}/newMovies`,
        }),
        getTopMovies: builder.query({
            query: () => `${MOVIE_URL}/topMovies`,
        }),
        getRandomMovies: builder.query({
            query: () => `${MOVIE_URL}/randamMovies`,
        }),
    }),
});

export const {
    useGetAllMoviesQuery,
    useCreateMoviesMutation,
    useUpdateMovieMutation,
    useAddMovieReviewMutation,
    useDeleteCommentMutation,
    useDeleteMovieMutation,
    useGetSpecificMovieQuery,
    useUploadImageMutation,
    useGetNewMoviesQuery,
    useGetTopMoviesQuery,
    useGetRandomMoviesQuery,
} = movieApiSlice;
