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
    key: "q2_1",
    label:
      "2.1 Which one of the following best describes the Crop Rotation & Diversity  practices in this farm?",
    options: [
      { value: 0, label: "0 - Mono-cropping followed throughout." },
      {
        value: 1,
        label: "1 - Rotation done once in a while, with limited diversity.",
      },
      { value: 2, label: "2 - Seasonal rotation practiced with 2 – 3 crops" },
      {
        value: 3,
        label: "3 - Intentional multi-season rotation with diverse crops.",
      },
      {
        value: 4,
        label:
          "4 - 4 Polyculture/intercropping used, integrating trees or perennial species where possible.",
      },
    ],
  },
  {
    key: "q2_2",
    label:
      "2.2 Which one of the following best describes the  Use of Indigenous or Resilient Seeds  practices in this farm?",
    options: [
      { value: 0, label: "0 - Fully dependent on hybrid or GM seeds." },
      { value: 1, label: "1 - One indigenous variety grown occasionally." },
      { value: 2, label: "2 - Mix of commercial and local seeds used." },
      { value: 3, label: "3 - Local/open-pollinated seeds preferred for most crops." },
      { value: 4, label: "4 - Community-led seed saving and breeding practiced for diverse, climate-resilient crops." },
    ],
  },

];

function Page5({ onNext, onBack, form }) {
  const [data, setData] = useState({
    q2_1: form.q2_1 ?? "",
    q2_2: form.q2_2 ?? "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = {};
    questions.forEach((q) => {
      // Not Applicable (-1) is allowed, but empty is not
      if (data[q.key] === "") err[q.key] = "Required";
    });
    setError(err);
    if (Object.keys(err).length === 0) onNext(data);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: "left" }}>
      <Typography variant="h5" gutterBottom color="primary">
        2) Biodiversity & Crop Management
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

export default Page5;
 