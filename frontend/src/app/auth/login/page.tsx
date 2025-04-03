"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { ApiCall } from "@/app/utils/api";
import Register from "../register/page";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [registerData, setRegister]= useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  

  const onSubmit = async (formData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response : any = await ApiCall({
        url: "http://localhost:8000/user/login-user", 
        method: "POST",
        body: formData,
      });
      if(response){
        alert("Login successful");
      }
      
    } catch (err: any) {
        console.log(err.message)
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (credentials : any) => {
    try {
      const response = await fetch("http://your-api.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token); // Store token in localStorage
        window.location.reload(); // Reload to update UI based on role
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  console.log(loginUser)

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      {!registerData ? (
        <Box className="container border-1 rounded-4 card" sx={{ maxWidth: 400, p: 4, m: "auto" }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>
  
          {error && <Alert severity="error">{error}</Alert>}
  
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
            />
  
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
            />
  
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Button
        variant="text"
        sx={{ mt: 2 }}
        onClick={() => setRegister(!registerData)}
      >
        {registerData ? "Already have an account? Login" : "Don't have an account? Register"}
      </Button>
        </Box>
      ) : (
        <Register setRegister = {setRegister}/>
      )}
    </>
  );
  
};

export default Login;
