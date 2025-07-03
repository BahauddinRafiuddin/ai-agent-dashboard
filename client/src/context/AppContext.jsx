import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const checkAuth = async (params) => {
      const userToken = localStorage.getItem("user");

      setUser(null);
      if (userToken) {
        try {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${userToken}`;
          const res = await axios.get("/api/user/auth");
          if (res.data.success) {
            setUser(res.data.user);
            // No need to set isAdmin here, as this is for regular users
          } else {
            localStorage.removeItem("user");
            console.warn("User token invalid or expired, user logged out.");
          }
        } catch (error) {
          console.error("Error checking user authentication:", error);
          localStorage.removeItem("token");
        }
      }
    };
    checkAuth()
  }, []);
  const value = { axios, navigate, user, setUser };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
