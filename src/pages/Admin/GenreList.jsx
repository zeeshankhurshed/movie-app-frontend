import { useEffect, useState } from "react";
import { useCreateGenreMutation, useDeleteGenreMutation, useFetchGenreQuery, useUpdateGenreMutation } from '../../redux/api/genre.js';
import { toast } from "react-toastify";
import GenreForm from "../../components/GenreForm.jsx";
import Modal from "../../components/Modal.jsx";

const GenreList = () => {
    const { data: genres, refetch } = useFetchGenreQuery();
    // console.log('genres',genres);
    
    const [name, setName] = useState("");
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [updatingName, setUpdatingName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
  
    const [createGenre] = useCreateGenreMutation();
    const [updateGenre] = useUpdateGenreMutation();
    const [deleteGenre] = useDeleteGenreMutation();
  
    const handleCreateGenre = async (e) => {
      e.preventDefault();
  
      if (!name) {
        toast.error("Genre name is required");
        return;
      }
  
      try {
        const result = await createGenre({ name }).unwrap();
  
        if (result.error) {
          toast.error(result.error);
        } else {
          setName("");
          toast.success("Genre created successfully.");
          refetch();
        }
      } catch (error) {
        console.error(error);
        toast.error("Creating genre failed, try again.");
      }
    };
  
    const handleUpdateGenre = async (e) => {
      e.preventDefault();
  
      if (!updateGenre) {
        toast.error("Genre name is required");
        return;
      }
  
      try {
        const result = await updateGenre({
          id: selectedGenre._id,
          updateGenre: {
            name: updatingName,
          },
        }).unwrap();
  
        if (result.error) {
          toast.error(result.error);
        } else {
            toast.success("Genre updated successfully.");

          refetch();
          setSelectedGenre(null);
          setUpdatingName("");
          setModalVisible(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleDeleteGenre = async () => {
      try {
        const result = await deleteGenre(selectedGenre._id).unwrap();
  
        if (result.error) {
          toast.error(result.error);
        } else {
            toast.success("Genre deleted successfully.");
          refetch();
          setSelectedGenre(null);
          setModalVisible(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Genre deletion failed. Tray again.");
      }
    };
  
    return (
      <div className="ml-[10rem] flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3">
          <h1 className="h-12">Manage Genres</h1>
          <GenreForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateGenre}
          />
  
          <br />
  
          <div className="flex flex-wrap">
          {Array.isArray(genres?.all) && genres.all.map((genre) => (
  <div key={genre._id}>
    <button
      className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
      onClick={() => {
        setModalVisible(true);
        setSelectedGenre(genre);
        setUpdatingName(genre.name);
      }}
    >
      {genre.name}
    </button>
  </div>
))}

          </div>
  
          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <GenreForm
              value={updatingName}
              setValue={(value) => setUpdatingName(value)}
              handleSubmit={handleUpdateGenre}
              buttonText="Update"
              handleDelete={handleDeleteGenre}
            />
          </Modal>
        </div>
      </div>
    );
  };
  
  export default GenreList;

