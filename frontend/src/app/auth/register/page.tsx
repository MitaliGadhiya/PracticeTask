"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { ApiCall } from "@/app/utils/api";

interface Props {
  setRegister: (value: boolean) => void; 
}

const Register = ({ setRegister }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData: any) => {
    console.log(formData);
    setLoading(true);
    setError(null);
    try {
      const response: any = await ApiCall({
        url: "http://localhost:8000/user/insert-user",
        method: "POST",
        body: formData,
      });
      if (response) {
        alert("Register successful");
        setRegister(false); 
      }
    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Box
      className="container border-1 rounded-4 card"
      sx={{ maxWidth: 400, p: 4, m: "auto" }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Register
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("fname", { required: "First Name is required" })}
          error={!!errors.fname}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("lname", { required: "Last Name is required" })}
          error={!!errors.lname}
        />
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
        <TextField
          label="Mobile Number"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("mobile", { required: "Mobile Number is required" })}
          error={!!errors.mobile}
        />
        <TextField
          label="Role"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("role", { required: "Role is required" })}
          error={!!errors.role}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit"}
        </Button>
      </form>

      <Button
        variant="text"
        sx={{ mt: 2 }}
        onClick={() => setRegister(false)} // Switch to Login
      >
        Already have an account? Login
      </Button>
    </Box>
  );
};

export default Register;
