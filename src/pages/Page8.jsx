import React, { useState } from 'react';
import { Typography, Paper, Box, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const questions = [
  {
    key: 'q5_1',
    label: '5.1 Which one of the following best describes the Rainwater Harvesting & Groundwater Recharge practices in this farm? ',
    options: [
      { value: 0, label: '0 - No rainwater harvesting structures.' },
      { value: 1, label: '1 - Basic bunding or trenches with minimal impact.' },
      { value: 2, label: '2 - Farm ponds or check dams on parts of the farm.' },
      { value: 3, label: '3 - Effective farm-level harvesting structures maintained.' },
      { value: 4, label: '4 - Integrated recharge system with soil moisture, ponds, and runoff control.' },

    ],
  },
  {
    key: 'q5_2',
    label: '5.2  Which one of the following best describes the Soil Moisture Conservation practices in this farm?',
    options: [
      { value: 0, label: '0 - Water runs off quickly; no moisture management.' },
      { value: 1, label: '1 - Mulching done occasionally.' },
      { value: 2, label: '2 - Regular mulching or compost used for moisture.' },
      { value: 3, label: '3 - Water-saving practices like furrow planting adopted.' },
      { value: 4, label: '4 - Contour bunds, cover crops, mulch, and soil structure ensure year-round moisture.' },

    ],
  },
  
];

function Page8({ onNext, onBack, form }) {
  const [data, setData] = useState({
    q5_1: form.q5_1 || '',
    q5_2: form.q5_2 || '',
  });
  const [error, setError] = useState({});

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    let err = {};
    questions.forEach(q => {
      if (data[q.key] === '') err[q.key] = 'Required';
    });
    setError(err);
    if (Object.keys(err).length === 0) onNext(data);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'left' }}>
      <Typography variant="h5" gutterBottom color="primary">5) Water & Soil Moisture Management</Typography>
      <form onSubmit={handleSubmit}>
        {questions.map(q => (
          <FormControl key={q.key} component="fieldset" sx={{ mt: 2, width: '100%', textAlign: 'left' }} error={!!error[q.key]}>
            <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1, textAlign: 'left' }}>
              {q.label}
            </FormLabel>
            <RadioGroup
              name={q.key}
              value={data[q.key]}
              onChange={handleChange}
              sx={{ textAlign: 'left' }}
            >
              {q.options.map(opt => (
                <FormControlLabel
                  key={opt.value}
                  value={String(opt.value)}
                  control={<Radio />}
                  label={opt.label}
                  sx={{ display: 'block', ml: 0, my: 0.5, textAlign: 'left' }}
                />
              ))}
            </RadioGroup>
            {error[q.key] && (
              <Typography color="error" variant="caption">
                {error[q.key]}
              </Typography>
            )}
          </FormControl>
        ))}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={onBack}>Back</Button>
          <Button variant="contained" type="submit">Finish</Button>
        </Box>
      </form>
    </Paper>
  );
}

export default Page8;