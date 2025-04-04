import { Navigate } from 'react-router-dom';
import { useUserContext } from '../store/userContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useUserContext();

    if (loading) {
        return <div>Cargando...</div>;
    }
    if (!user) {
        return <Navigate to="/auth/inicio-sesion" replace />;
    }

    return children;
};

const RoleRoute = ({ children, allowedRole }) => {
    const { user, loading } = useUserContext();

    if (loading) return null;

    if (!user) {
        return <Navigate to="/auth/inicio-sesion" replace />;
    }

    if (user.rol?.name !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};


const StudentRoute = ({ children }) => {
    const { user, loading } = useUserContext();

    if (loading) return null;

    if (!user) return <Navigate to="/auth/inicio-sesion" replace />;

    return children;
};

export { RoleRoute, ProtectedRoute, StudentRoute };
