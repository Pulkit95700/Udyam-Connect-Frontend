import { createContext, useState, useEffect } from "react";
import { publicPostMethod } from "../requests/publicRequests/publicPostMethod";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  isAuthenticated: false,
});

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const loginuser = (username, password) => {
    publicPostMethod(
      "user/login/",
      {
        username,
        password,
      },
      (response) => {
        if (response?.status === 200) {

          localStorage.setItem("tokens", JSON.stringify(response.data?.token));
          localStorage.setItem("company", JSON.stringify(response.data?.company))
          setUser(response.data?.company);
          navigate("/");
        } else {
          setUser(false);
        }
      }
    );
  };

  const logout = () => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("company");
    navigate("/user/login");
    setUser(false);
  }

  return (
    <AuthContext.Provider
      value={{
        loginuser,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
