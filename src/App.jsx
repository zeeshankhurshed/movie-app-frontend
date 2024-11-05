import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Layout from './components/Layout';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./pages/Auth/PrivateRoute";
import Profile from './pages/User/Profile';
import GenreList from "./pages/Admin/GenreList";
import AdminRoutes from "./pages/Admin/AdminRoutes";
import CreateMovie from "./pages/Admin/CreateMovie";
import AdminMoviesList from "./pages/Admin/AdminMoviesList";
import UpdateMovie from "./pages/Admin/UpdateMovie";
import AllMovies from "./pages/Movies/AllMovies";
import MovieDetails from "./pages/Movies/MovieDetails";
import AllComments from "./pages/Admin/AllComments";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index={true} element={<Home />} />
        <Route path="/movies" element={<AllMovies />} /> 
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Route wrapper for protected routes */}
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
   

          <Route path="" element={<AdminRoutes />}>
        <Route path="/admin/movies/genre" element={<GenreList />} />
        <Route path="/admin/movies/create" element={<CreateMovie />} />
        <Route path="/admin/moviesList" element={<AdminMoviesList />} />
        <Route path="/admin/movies/update/:id" element={<UpdateMovie />} />
        <Route path="/admin/movies/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/movies/comments" element={<AllComments />} />
       
      </Route>


      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
