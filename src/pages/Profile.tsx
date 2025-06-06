import { useNavigate } from "react-router-dom";
import { AuthService, useCurrentUser } from "../services";
import EditProfile from "./EditProfile";

const Profile = () => {
  const navigate = useNavigate();
  const { userData, loading, error, refetch } = useCurrentUser();
  void refetch;

  console.log("Datos del usuario:", userData);

  const handleLogout = async () => {
    try {
      await AuthService.signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div>
      <EditProfile
        userData={userData}
        onLogout={handleLogout}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Profile;
