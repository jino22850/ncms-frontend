import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/API";
import axios from "axios";


const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userInfo = localStorage.getItem("userInfo");

    if (token && userInfo) {
      setUser(JSON.parse(userInfo));
      setIsAuthenticated(true);
    }
  }, []); 


  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/slrc/auth/login`,
        credentials
      );

      if (response.data.token) {
       
        localStorage.setItem("authToken", response.data.token);

     
        const userInfo = {
          id: response.data.id,
          name: response.data.name,
          email: credentials.email,
          role: response.data.role,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

      
        setUser(userInfo);
        setIsAuthenticated(true);

  
        navigate("/dashboard");
      } else {
        throw new Error("Login failed: No token received");
      }
    } catch (error) {

      clearAuthData();

   
      console.error("Login failed:", error);
      throw new Error(
        error.response?.data?.message ||
          "An error occurred during login. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  
  const logout = () => {
   
    clearAuthData();

   
    navigate("/login");
  };

 
  const clearAuthData = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    setUser(null);
    setIsAuthenticated(false);
  };

  
  const contextValue = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthProvider;
