import { useState } from "react";
import { AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';
import { MdOutlineLocalMovies } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { useLoginMutation, useLogoutMutation } from "../../redux/api/user";
import { toast } from "react-toastify";

export default function Navigation() {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropDownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginApiCall] = useLoginMutation();
  const [logoutApiCall] = useLogoutMutation();

  // Toggle the dropdown menu
  const toggleDropdown = () => setDropdownOpen(!dropDownOpen);

  // Logout handler function
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast('Logout Successfully');
      navigate('/login');
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="fixed bottom-16 left-[42rem] transform translate-x-1/2 translate-y-1/2 z-50 bg-[#0f0f0f] border w-[30%] p-[2rem] rounded">
      <div className="flex justify-between items-center">
        {/* section 1 */}
        <div className="flex justify-center items-center">
          <Link to={'/'}
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineHome className="mr-2 text-white" size={26}/>
            <span className="hidden nav-item-name mt-[3rem] text-white">HOME</span>
          </Link>

          <Link to={'/movies'} className="flex items-center transition-transform transform hover:translate-x-2 ml-[1rem]">
            <MdOutlineLocalMovies className="mr-2 text-white" size={26}/>
            <span className="hidden nav-item-name mt-[3rem] text-white">SHOP</span>
          </Link>
        </div>
        {/* section 2 */}
        <div className="relative ">
          <button onClick={toggleDropdown} className="flex items-center text-gray-800 focus:outline-none">
            {
              userInfo ? (
                <span className="text-white">{userInfo.username}</span>
              ) : null
            }
            {userInfo && (
              <svg
                xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 ${dropDownOpen ? "transform rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropDownOpen ? "M5 15l7-7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            )}
          </button>
          {
            dropDownOpen && userInfo && (
              <ul className="absolute -right-12 bottom-10 mt-2 w-40 space-y-2 bg-white text-gray-600 rounded shadow-md">
                {userInfo.isAdmin && (
                  <li>
                    <Link
                      to={'/admin/movies/dashboard'}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link to={'/profile'} className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                </li>
              </ul>
            )
          }
          {!userInfo && (
            <ul className="flex items-center">
              <li>
                <Link to={'/login'} className="flex items-center  transition-transform transform hover:translate-x-2 ">
                  <AiOutlineLogin className="mr-2 text-white" size={26}/>
                  <span className="hidden nav-item-name">LOGIN</span>
                </Link>
              </li>
              <li>
                <Link to={'/register'}
                  className="flex items-center transition-transform transform hover:translate-x-2 ml-4"
                >
                  <AiOutlineUserAdd className="text-white" size={26}/>
                  <span className="hidden nav-item-name">REGISTER</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
