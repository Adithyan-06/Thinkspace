import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    setUser(userData);
  };

  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    localStorage.clear();
    navigate("https://thinkspace-u51i.onrender.com/api/"); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
