import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children }) {
    const { userInfo } = useSelector((state) => state.auth);

    return userInfo ? children : <Navigate to="/login" replace />;
}


