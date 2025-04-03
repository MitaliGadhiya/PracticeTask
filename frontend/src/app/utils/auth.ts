import {jwtDecode} from "jwt-decode";

// Function to store token in localStorage
export const storeToken = (token : any) => {
  if (token) {
    localStorage.setItem("token", token);
  }
};

// Function to get user role from token
export const getUserRole = () => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  if (!token) return null;

  try {
    const decodedToken : any = jwtDecode(token); // Decode JWT token
    return decodedToken.role; // Assuming "role" is in the payload
  } catch (error) {
    console.error("Invalid Token:", error);
    return null;
  }
};

// Function to logout user and remove token
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; // Redirect to login page
};
