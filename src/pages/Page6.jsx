import React, { useState } from "react";
import {
  Typography,
  Paper,
  Box,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const questions = [
  {
    key: "q3_1",
    label:
      "3.1 Which one of the following best describes the  Use of Chemical Pesticides practices in this farm?",
    options: [
      {
        value: 0,
        label: "0 - 0 Regular use of chemical pesticides and herbicides.",
      },
      { value: 1, label: "1 - Reduced chemical sprays in some plots." },
      { value: 2, label: "2 - Mixed use of chemicals and natural sprays." },
      {
        value: 3,
        label:
          "3 - Fully transitioned to natural/bio pest control (e.g. neem, cow-based).",
      },
      {
        value: 4,
        label:
          "4 - Ecological pest management with habitat enhancement (e.g. trap crops, predators)",
      },
    ],
  },
  {
    key: "q3_2",
    label: "3.2  Which one of the following best describes the Input Reliance practices in this farm?",
    options: [
      { value: 0, label: "0 - Fully dependent on external inputs (seeds, fertilizers, pesticides)." },
      { value: 1, label: "1 - Some homemade inputs used." },
      { value: 2, label: "2 - Use of jeevamrit/panchagavya on select plots." },
      { value: 3, label: "3 - Most inputs prepared on-farm with natural materials." },
      { value: 4, label: "4 - Complete input self-reliance with community-level sharing and training." },

    ],
  },
];

function Page6({ onNext, onBack, form }) {
  const [data, setData] = useState({
    q3_1: form.q3_1 ?? "",
    q3_2: form.q3_2 ?? "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = {};
    questions.forEach((q) => {
      if (data[q.key] === "") err[q.key] = "Required";
    });
    setError(err);
    if (Object.keys(err).length === 0) onNext(data);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: "left" }}>
      <Typography variant="h5" gutterBottom color="primary">
        3) Pest, Disease and Input Management
      </Typography>
      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <FormControl
            key={q.key}
            component="fieldset"
            sx={{ mt: 2, width: "100%", textAlign: "left" }}
            error={!!error[q.key]}
          >
            <FormLabel
              component="legend"
              sx={{ fontWeight: 600, mb: 1, textAlign: "left" }}
            >
              {q.label}
            </FormLabel>
            <RadioGroup
              name={q.key}
              value={data[q.key]}
              onChange={handleChange}
              sx={{ textAlign: "left" }}
            >
              {q.options.map((opt) => (
                <FormControlLabel
                  key={opt.value}
                  value={String(opt.value)}
                  control={<Radio />}
                  label={opt.label}
                  sx={{ display: "block", ml: 0, my: 0.5, textAlign: "left" }}
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
  );
}

export default Page6;
 