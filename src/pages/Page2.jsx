import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";

function Page2({ onNext, onBack, form }) {
  const [data, setData] = useState({
    fullName: form.fullName || "",
    date: form.date || "",
    gender: form.gender || "",
    dob: form.dob || "",
    aadhar: form.aadhar || "",
  });

  const [error, setError] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        return /^[A-Za-z\s]+$/.test(value)
          ? ""
          : "Name must contain only letters and spaces";
      case "aadhar":
        return /^\d{12}$/.test(value) ? "" : "Aadhar must be exactly 12 digits";
      case "gender":
        return value ? "" : "Please select gender";
      case "dob":
        return value ? "" : "Date of birth required";
      case "date":
        return value ? "" : "Assessment date required";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = ["aadhar"].includes(name)
      ? value.replace(/\D/g, "")
      : value;

    setData((prev) => ({ ...prev, [name]: cleanedValue }));
    setError((prev) => ({
      ...prev,
      [name]: validateField(name, cleanedValue),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = {};
    for (let key in data) {
      const validationError = validateField(key, data[key]);
      if (validationError) err[key] = validationError;
    }

    setError(err);
    if (Object.keys(err).length === 0) onNext(data);
  };

  return (
    <div>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom color="primary">
          <h2>About the Farmer whose farm is being assessed</h2>
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name of Farmer"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            error={!!error.fullName}
            helperText={error.fullName}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Date of Assessment"
            name="date"
            type="date"
            value={data.date}
            onChange={handleChange}
            error={!!error.date}
            helperText={error.date}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />

          <Box sx={{ textAlign: "left" }}>
            <TextField
              select
              label="Gender"
              name="gender"
              value={data.gender}
              onChange={handleChange}
              error={!!error.gender}
              helperText={error.gender}
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
          </Box>

          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={data.dob}
            onChange={handleChange}
            error={!!error.dob}
            helperText={error.dob}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            label="Aadhar Card Number"
            name="aadhar"
            value={data.aadhar}
            onChange={handleChange}
            error={!!error.aadhar}
            helperText={error.aadhar}
            fullWidth
            margin="normal"
            inputProps={{
              maxLength: 12,
              inputMode: "numeric",
              pattern: "\\d{12}",
            }}
            required
          />

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={onBack}>
              Back
            </Button>
            <Button variant="contained" type="submit">
              Next
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
}

export default Page2;
