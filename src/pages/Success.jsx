import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

// Utility to interpolate colors between red, orange, and green
function lerpColor(color1, color2, t) {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);

  const r1 = (c1 >> 16) & 0xff;
  const g1 = (c1 >> 8) & 0xff;
  const b1 = c1 & 0xff;

  const r2 = (c2 >> 16) & 0xff;
  const g2 = (c2 >> 8) & 0xff;
  const b2 = c2 & 0xff;

  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);

  return `rgb(${r}, ${g}, ${b})`;
}

function getColorForScore(avg) {
  const red = "#f44336";
  const orange = "#ff9800";
  const green = "#4caf50";

  const clamped = Math.min(Math.max(avg, 0), 3);
  const t = clamped / 3;

  if (t < 0.5) {
    return lerpColor(red, orange, t * 2);
  } else {
    return lerpColor(orange, green, (t - 0.5) * 2);
  }
}

function calculateSectionScore(section, form) {
  let score = 0;
  let validQuestions = 0;

  section.questions.forEach((q) => {
    const value = Number(form[q.key]);
    if (q.notApplicableValue !== undefined && value === q.notApplicableValue)
      return;
    if (!isNaN(value)) {
      score += value;
      validQuestions++;
    }
  });

  const avg = validQuestions > 0 ? score / validQuestions : 0;

  return { score, avg, validQuestions };
}

function calculateOverallAverage(form, sections) {
  let totalSectionAvg = 0;
  let validSectionCount = 0;

  sections.forEach((section) => {
    const { avg, validQuestions } = calculateSectionScore(section, form);
    if (validQuestions > 0) {
      totalSectionAvg += avg;
      validSectionCount++;
    }
  });

  const avg = validSectionCount > 0 ? totalSectionAvg / validSectionCount : 0;
  return {
    avg: parseFloat(avg.toFixed(2)),
  };
}

function getMaturityLevel(avg) {
  if (avg >= 2.5) return "Achiever";
  if (avg >= 1.5) return "Performer";
  if (avg >= 0.5) return "Front Runner";
  return "Aspirant";
}

function Success({ form, onRestart, sections }) {
  const submittedRef = React.useRef(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { avg } = calculateOverallAverage(form, sections);
  const maturity = getMaturityLevel(avg);
  const overallColor = getColorForScore(avg);

  useEffect(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    const payload = {
      fullName: form.fullName,
      email: form.email,
      whatsapp: form.whatsapp,
      date: form.date,
      buildingName: form.buildingName,
      mapLink: form.mapLink,
      unitsCount: form.unitsCount,
      ...sections.reduce((acc, section) => {
        section.questions.forEach((q) => {
          acc[q.key] = form[q.key];
        });
        return acc;
      }, {}),
      score_water_management: calculateSectionScore(sections[0], form).score,
      score_water_efficiency: calculateSectionScore(sections[1], form).score,
      score_groundwater: calculateSectionScore(sections[2], form).score,
      score_circularity: calculateSectionScore(sections[3], form).score,
      score_green_cover: calculateSectionScore(sections[4], form).score,
    };

    fetch("http://localhost:5000/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to submit form data");
        return res.json();
      })
      .then((data) => {
        console.log("✅ Submission saved:", data);
      })
      .catch((err) => {
        setSubmitError(err.message || "Unknown error");
        console.error("❌ Submit error:", err);
      });
  }, [form, sections]);

  return (
    <Box
      sx={{
        p: 4,
        m: "auto",
        maxWidth: 1200,
        backgroundColor: "#fff",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold" }}
      >
        <h4>
          Thank you, {form.fullName}, Your responses have been successfully
          submitted.
        </h4>
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
        Summary of your Results:
      </Typography>

      <Box
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: overallColor,
          color: "white",
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        <div>Overall Average Score: {avg}</div>
        <div>Maturity Level: {maturity}</div>
      </Box>

      {sections.map((section, idx) => {
        const { score, avg: sectionAvg, validQuestions } = calculateSectionScore(
          section,
          form
        );
        const sectionColor = getColorForScore(sectionAvg);

        return (
          <Paper key={idx} elevation={3} sx={{ mb: 4, p: 2, borderRadius: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {section.title}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "white",
                  backgroundColor: sectionColor,
                  p: 1,
                  borderRadius: 1,
                  fontWeight: "bold",
                  minWidth: 130,
                  textAlign: "right",
                }}
              >
                Average Score: {sectionAvg.toFixed(2)}
              </Typography>
            </Box>

            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Question</b>
                    </TableCell>
                    <TableCell>
                      <b>Response</b>
                    </TableCell>
                    <TableCell>
                      <b>Score</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {section.questions.map((q, i) => {
                    const value = form[q.key];
                    if (
                      q.notApplicableValue !== undefined &&
                      Number(value) === q.notApplicableValue
                    ) {
                      return (
                        <TableRow key={i}>
                          <TableCell>{q.label}</TableCell>
                          <TableCell>Not Applicable</TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                      );
                    }
                    const numericValue = Number(value);
                    const optionLabel =
                      q.options?.[numericValue] ?? "No response";
                    return (
                      <TableRow key={i}>
                        <TableCell>{q.label}</TableCell>
                        <TableCell>{optionLabel}</TableCell>
                        <TableCell>
                          {isNaN(numericValue) ? "-" : numericValue}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        );
      })}

      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button variant="contained" color="primary" onClick={onRestart}>
          Submit Another Response
        </Button>
      </Box>
    </Box>
  );
}

export default Success;
 