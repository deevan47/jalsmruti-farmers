import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
} from '@mui/material';

function Page3({ onNext, onBack, form }) {
  const [data, setData] = useState({
    apartmentName: form.apartmentName || '',
    mapLink: form.mapLink || '',
    area: form.area || '',
    cropDetails: form.cropDetails || '',
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'mapLink':
        if (
          !/^https?:\/\/(www\.)?(google\.com\/maps|goo\.gl\/maps|maps\.app\.goo\.gl)/.test(value)
        ) {
          return 'Please enter a valid Google Maps link';
        }
        return '';
      case 'apartmentName':
      case 'area':
      case 'cropDetails':
        return value.trim() === '' ? 'Required' : '';
      default:
        return '';
    }
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
          <h3>About the Farm that is being Assessed</h3>
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name of the Farm land which is being assessed (Eg East portion, West portion etc)"
            name="apartmentName"
            value={data.apartmentName}
            onChange={handleChange}
            error={!!error.apartmentName}
            helperText={error.apartmentName}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Google map location link of the Farm land being assessed"
            name="mapLink"
            value={data.mapLink}
            onChange={handleChange}
            error={!!error.mapLink}
            helperText={error.mapLink}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="What is the area of the farm land being assessed? (include the units, e.g. '1.5 acres', '2 hectares')"
            name="area"
            value={data.area}
            onChange={handleChange}
            error={!!error.area}
            helperText={error.area}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Describe the current crops (current, past, or future) with timing info"
            name="cropDetails"
            value={data.cropDetails}
            onChange={handleChange}
            error={!!error.cropDetails}
            helperText={error.cropDetails}
            fullWidth
            margin="normal"
            multiline
            minRows={4}
            required
          />

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={onBack}>
              Previous
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

export default Page3;
 