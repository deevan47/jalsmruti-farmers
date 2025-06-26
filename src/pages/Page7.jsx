import React, { useState } from 'react';
import { Typography, Paper, Box, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const questions = [
  {
    key: 'q4_1',
    label: '4.1  Which one of the following best describes the Livestock Integration with Cropping Systems practices in this farm? ',
    options: [
      { value: 0, label: '0 - No livestock or completely separated from crops.' },
      { value: 1, label: '1 - Livestock present but not integrated into farm system.' },
      { value: 2, label: '2 - Manure used occasionally on fields' },
      { value: 3, label: '3 - Livestock and crop systems managed to support each other.' },
      { value: 4, label: '4 - Full integration: rotational grazing, manure used for composting, fodder crops grown.' },

    ],
  },
  {
    key: 'q4_2',
    label: '4.2  Which one of the following best describes the Livestock Grazing practices in this farm?',
    options: [
      { value: 0, label: '0 - Free grazing without management.' },
      { value: 1, label: '1 - Stall-fed or tethered grazing, no rotation.' },
      { value: 2, label: '2 - Some paddock or rotational grazing practiced.' },
      { value: 3, label: '3 - Managed rotational grazing with rest periods for recovery.' },
      { value: 4, label: '4 - Holistic grazing with pasture improvement and high biomass regeneration.' },

    ],
  },

];

function Page7({ onNext, onBack, form }) {
  const [data, setData] = useState({
    q4_1: form.q4_1 ?? '',
    q4_2: form.q4_2 ?? '',
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
      <Typography variant="h5" gutterBottom color="primary">4) Integration of Livestock</Typography>
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
          <Button variant="contained" type="submit">Next</Button>
        </Box>
      </form>
    </Paper>
  );
}

export default Page7; 