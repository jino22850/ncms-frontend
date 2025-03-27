// // auth.js
// export const setToken = (token) => {
//     localStorage.setItem("token", token);
//   };
  
//   export const getToken = () => {
//     return localStorage.getItem("token");
//   };
  
//   export const removeToken = () => {
//     localStorage.removeItem("token");
//   };
  
//   export const isAuthenticated = () => {
//     return !!getToken();  // Checks if there's a token in localStorage
//   };
  
//   export const getUserRole = () => {
//     const token = getToken();
//     if (!token) return null;
  
//     const decoded = JSON.parse(atob(token.split('.')[1])); // Decodes the JWT token payload
//     return decoded.role; // Assumes the role is stored in the payload
//   };
  