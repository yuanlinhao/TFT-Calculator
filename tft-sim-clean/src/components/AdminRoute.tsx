import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

type Props = {
  children: JSX.Element;
};

function AdminRoute({ children }: Props) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;
