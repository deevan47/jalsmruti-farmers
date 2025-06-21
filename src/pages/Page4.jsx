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
    key: "q1_1",
    label:
      "1.1 Which one of the following best describes the crop cover and living roots in this farm?",
    options: [
      {
        value: 0,
        label: "0 Fields remain bare post-harvest; no cover or living roots.",
      },
      {
        value: 1,
        label: "1 - Occasional cover or volunteer growth left unintentionally.",
      },
      { value: 2, label: "2- Cover crops used in some seasons" },
      {
        value: 3,
        label: "3- Cover crops used intentionally and consistently on most plots.",
      },
      {
        value: 4,
        label:
          "4- Diverse, multi-species cover crops maintained year-round for continuous soil cover and living roots",
      },
    ],
  },
  {
    key: "q1_2",
    label:
      "1.2 Which one of the following best describes the tillage practices in this farm?",
    options: [
      { value: 0, label: "0- Conventional deep tillage used regularly." },
      { value: 1, label: "1- Occasional reduced tillage in select plots." },
      { value: 2, label: "2- Reduced tillage used across many." },
      { value: 3, label: "3- Minimum tillage applied consistently." },
      {
        value: 4,
        label:
          "4- No-till or minimal disturbance practiced with specialized tools; soil structure well-preserved.",
      },
    ],
  },
  {
    key: "q1_3",
    label:
      "1.3 Which one of the following best describes the  Soil Amendments  practices in this farm?",
    options: [
      {
        value: 0,
        label: "0- No compost or organic inputs; only synthetic fertilizers used.",
      },
      { value: 1, label: "1- Some compost used, often externally sourced." },
      { value: 2, label: "2- Own-farm compost applied to a few plots." },
      {
        value: 3,
        label: "3- Regular application of well-prepared compost/farmyard manure.",
      },
      {
        value: 4,
        label:
          "4- Integrated system using compost, bioinputs, and soil biology enhancement (e.g.jeevamrit/vermicompost).",
      },
    ],
  },
];

function Page4({ onNext, onBack, form }) {
  const [data, setData] = useState({
    q1_1: form.q1_1 ?? "",
    q1_2: form.q1_2 ?? "",
    q1_3: form.q1_3 ?? "",
    q1_4: form.q1_4 ?? "",
    q1_5: form.q1_5 ?? "",
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
        1) Soil Health Assessment
      </Typography>
      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <FormControl
            key={q.key}
            component="fieldset"
            sx={{ mt: 3, mb: 2, width: "100%", textAlign: "left" }}
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
                  label={`${opt.value} - ${opt.label}`}
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

export default Page4;
