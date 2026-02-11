import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { user } = useContext(ShopContext);

    // If no user is logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If admin access is required but user is not admin, redirect to home
    if (requireAdmin && !user.isAdmin) {
        return <Navigate to="/" replace />;
    }

    // If user is admin trying to access shop routes, redirect to admin
    if (!requireAdmin && user.isAdmin) {
        return <Navigate to="/admin" replace />;
    }

    return children;
};

export default ProtectedRoute;
