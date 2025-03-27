import React from 'react'
import {Navigate} from 'react-router-dom'

function ProtectedRoute({ children }) {
    const Token = localStorage.getItem('authToken'); 
    if (!Token) {
      return <Navigate to="/login" />;
    }
    return children;
  }
  

export default ProtectedRoute;