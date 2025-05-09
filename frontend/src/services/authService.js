import { API_URL } from "../config";
import axios from "axios";

export const verifyToken = async () => {
  const token = localStorage.getItem('token');
  console.log("🔑 Token récupéré depuis localStorage:", token);

  if (!token){
    console.error("❌ Aucun token trouvé !");
    console.log("Pas de token");
  };

  try {
    const response = await axios.post(
      `${API_URL}/auth/verify-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // { email, role, userId }
  } catch (error) {
    console.log("Tsy hita");
    console.error('Token invalide ou expiré');
    return null;
  }
};
