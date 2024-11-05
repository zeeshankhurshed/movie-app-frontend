import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useFetchGenreQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";
import { useCreateMoviesMutation, useUploadImageMutation } from "../../redux/api/movie";

export default function CreateMovie() {
    const navigate = useNavigate();

    const [movieData, setMovieData] = useState({
        name: '',
        year: 0,
        detail: '',
        cast: [],
        rating: 0,
        image: null,
        genre: ''
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [createMovie, { isLoading: isCreatingMovie, error: createMovieErrorDetail }] = useCreateMoviesMutation();
    const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDetails }] = useUploadImageMutation();
    const { data: genres, isLoading: isLoadingGenres } = useFetchGenreQuery();

    useEffect(() => {
        if (genres) {
            setMovieData((prevData) => ({
                ...prevData, genre: genres.all[0]?._id || ""
            }));
        }
    }, [genres]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'genre') {
            const selectedGenre = genres.all.find((genre) => genre._id === value);
            setMovieData((prevData) => ({
                ...prevData,
                genre: selectedGenre ? selectedGenre._id : ""
            }));
        } else {
            setMovieData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleCreateMovie = async () => {
        try {
            if (!movieData.name || !movieData.year || !movieData.detail || !movieData.cast || !selectedImage) {
                toast.error("Please fill all required fields.");
                return;
            }

            let uploadedImagePath = null;
            if (selectedImage) {
                const formData = new FormData();
                formData.append("image", selectedImage);

                const uploadImageResponse = await uploadImage(formData);
                if (uploadImageResponse.data) {
                    uploadedImagePath = uploadImageResponse.data.image;
                } else {
                    console.error("Failed to upload image:", uploadImageErrorDetails);
                    toast.error("Failed to upload image");
                    return;
                }
            }

            await createMovie({
                ...movieData,
                image: uploadedImagePath,
            });
            navigate('/admin/moviesList');

            setMovieData({
                name: "",
                year: 0,
                detail: "",
                cast: [],
                rating: 0,
                image: null,
                genre: "",
            });
            toast.success("Movie added to database");

        } catch (error) {
            console.error("Failed to create movie:", createMovieErrorDetail);
            toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`);
        }
    };

    return (
        <div className="container flex justify-center items-center mt-4">
            <form>
                <p className="text-green-200 w-[50rem] text-2xl mb-4">Create Movie</p>
                
                <div className="mb-4">
                    <label htmlFor="name" className="block">
                        Name:
                        <input 
                            type="text" 
                            name="name" 
                            value={movieData.name} 
                            onChange={handleChange}
                            className="border px-2 py-1 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </label>
                </div>

                <div className="mb-4">
                    <label htmlFor="year" className="block">
                        Year:
                        <input 
                            type="number" 
                            name="year" 
                            value={movieData.year} 
                            onChange={handleChange}
                            className="border px-2 py-1 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </label>
                </div>

                <div className="mb-4">
                    <label htmlFor="detail" className="block">
                        Detail:
                        <textarea 
                            name="detail" 
                            value={movieData.detail}
                            onChange={handleChange}
                            className="border px-2 py-1 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        ></textarea>
                    </label>
                </div>

                <div className="mb-4">
                    <label htmlFor="cast" className="block">
                        Cast (comma-separated):
                        <input 
                            type="text" 
                            name="cast" 
                            value={movieData.cast.join(",")} 
                            onChange={(e) => setMovieData({ ...movieData, cast: e.target.value.split(",") })}
                            className="border px-2 py-1 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </label>
                </div>

                <div className="mb-4">
                    <label htmlFor="genre" className="block">
                        Genre:
                        <select 
                            name="genre" 
                            value={movieData.genre}
                            onChange={handleChange}
                            className="border px-2 py-1 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            {isLoadingGenres ? (
                                <option>Loading genres...</option>
                            ) : (
                                genres?.all.map((genre) => (
                                    <option key={genre._id} value={genre._id}>{genre.name}</option>
                                ))
                            )}
                        </select>
                    </label>
                </div>

                <div className="my-4">
                    <label 
                        className={!selectedImage ? "border border-gray-400 p-2 rounded-md cursor-pointer" : ""}
                    >
                        {!selectedImage && "Upload Image"}
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange}
                            style={{ display: !selectedImage ? "none" : "block" }}
                        />
                    </label>
                </div>

                <button 
                    type="button" 
                    onClick={handleCreateMovie}
                    className="bg-teal-500 text-white px-4 py-2 rounded w-full uppercase" 
                    disabled={isCreatingMovie || isUploadingImage}
                >
                    {isCreatingMovie || isUploadingImage ? "Creating..." : "Create Movie"}
                </button>
            </form>
        </div>
    );
}
