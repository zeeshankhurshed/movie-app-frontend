import { useDeleteCommentMutation, useGetAllMoviesQuery } from '../../redux/api/movie';
import { toast } from 'react-toastify';

const AllComments = () => {
    const { data: movie, refetch } = useGetAllMoviesQuery();
  
    const [deleteComment] = useDeleteCommentMutation();
  
    const handleDeleteComment = async (movieId, reviewId) => {
      try {
        await deleteComment({ movieId, reviewId });
        toast.success("Comment Deleted");
        refetch();
      } catch (error) {
        console.error("Error deleting comment: ", error);
      }
    };
  
    return (
      <div>
        {movie?.map((m) => (
          <section
            key={m._id}
            className="flex flex-col justify-center items-center"
          >
            {m?.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#1A1A1A] p-4 rounded-lg w-[50%] mt-[2rem]"
              >
                <div className="flex justify-between">
                  <strong className="text-[#B0B0B0]">{review.name}</strong>
                  <p className="text-[#0b0b0b]">
                  {review.createdAt ? review.createdAt.substring(0, 10) : "Unknown Date"}
                </p>
                </div>
  
                <p className="my-4">{review.comment}</p>
  
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteComment(m._id, review._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </section>
        ))}
      </div>
    );
  };
  export default AllComments;
