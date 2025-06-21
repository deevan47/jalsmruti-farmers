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

const sections = [
  {
    title: "1. Water Management",
    questions: [
      {
        key: "q1_1",
        label: "1.1 Status of Water Policy",
        options: [
          "None",
          "Water policy making in progress",
          "Water Policy drafted",
          "Water Policy drafted & communicated to staff & tenants",
        ],
      },
      {
        key: "q1_2",
        label: "1.2 Status of Water Pledge",
        options: [
          "None",
          "Management have taken a water pledge",
          "Management + Facility Staff have taken a water pledge",
          "Management + Facility Staff + Tenants have taken a water pledge",
        ],
      },
      {
        key: "q1_3",
        label: "1.3 Status of Water Charter",
        options: [
          "None",
          "Water Charter drafting in progress",
          "Water Charter finalized",
          "Water Charter finalized and displayed in public",
        ],
      },
      {
        key: "q1_4",
        label: "1.4 Status of Water Saving Goals & Targets",
        options: [
          "None",
          "Work in progress",
          "Water saving goals & targets have been set",
          "Water saving goals & targets communicated to staff & tenants",
        ],
      },
    ],
  },
  {
    title: "2. Water Efficiency",
    questions: [
      {
        key: "q2_1",
        label: "2.1 Status of Water Metering",
        options: [
          "Bulk water meter",
          "Bulk meter + submeter",
          "Bulk meter + submeter + monthly or weekly monitoring",
          "Smart water sub meters",
        ],
      },
      {
        key: "q2_2",
        label:
          "2.2 Status of Water Fixtures (Average) Flow Rate in liters per minute (lpm)",
        options: ["(>15 lpm)", "(10-15 lpm)", "(5-10 lpm)", "(<5 lpm)"],
      },
      {
        key: "q2_3",
        label: "2.3 Status of Toilet Flushing",
        options: [
          "Single flush (>12 litres)",
          "Single flush (10-12 litres)",
          "Dual flush (12 /6 litres)",
          "Dual flush (8 /4 litres)",
        ],
      },
      {
        key: "q2_4",
        label: "2.4 Status of Water Conservation Signage & Communication",
        options: [
          "None",
          "Signage in washrooms",
          "Signage in washrooms and other areas",
          "Signage plus monthly staff and tenant awareness sessions",
        ],
      },
      {
        key: "q2_5",
        label: "2.5 Status of Water Use in Cooling Tower",
        options: [
          "No submeter and/or single pass use",
          "Submeter and single pass use",
          "Submeter and water recirculation factor <3",
          "Submeter & water recirculation factor >3",
          "Not Applicable",
        ],
        notApplicableValue: -1,
      },
      {
        key: "q2_6",
        label: "2.6 Status of Water Use Intensity",
        options: [
          "(>60% more than best practice benchmark)",
          "(51-60% more than best practice benchmark)",
          "(11-40% more than best practice benchmark)",
          "(Within 10% of best practice benchmark)",
        ],
      },
    ],
  },
  {
    title: "3. Groundwater Sustainability",
    questions: [
      {
        key: "q3_1",
        label:
          "3.1 Status of Groundwater dependency expressed as percentage of total annual water consumed",
        options: ["(>50%)", "(20-50%)", "(5-20%)", "(<5%)"],
      },
      {
        key: "q3_2",
        label: "3.2 Status of Groundwater Extraction",
        options: [
          "None",
          "Manual monitoring of pumped hours",
          "Manual metering",
          "Smart metering",
        ],
      },
      {
        key: "q3_3",
        label:
          "3.3 Status of Groundwater Recharge expressed as percentage of Groundwater extraction",
        options: ["(<20%)", "(20-40%)", "(40-50%)", "(>50%)", "Not Applicable"],
        notApplicableValue: -1,
      },
    ],
  },
  {
    title: "4. Water Circularity Status",
    questions: [
      {
        key: "q4_1",
        label: "4.1 Status of Rainwater Harvesting",
        options: [
          "None",
          "Roofwater harvesting from <50% of roof",
          "Roofwater harvesting from >50% of roof",
          "Roofwater harvesting + Non roof water harvesting",
        ],
      },
      {
        key: "q4_2",
        label: "4.2 Status of Greywater/Sewage Water Recycling or Reuse",
        options: [
          "None",
          "Footprint area available for siting a facility",
          "Work in progress - designed and waiting to be constructed",
          "Greywater/Sewage recycling is operational",
        ],
      },
      {
        key: "q4_3",
        label: "4.3 Status of Collective Reverse Osmosis Treated Water",
        options: [
          "No Reuse - Reject Water is Discharged",
          "Technically feasible to organize for non potable reuse",
          "Plans in place and to be executed",
          "Reject Water is being reused for non potable use",
          "Not Applicable",
        ],
        notApplicableValue: -1,
      },
    ],
  },
  {
    title: "5. Status of Green Vegetation Cover",
    questions: [
      {
        key: "q5_1",
        label: "5.1 Status of Green Cover Policy",
        options: [
          "None",
          "Green Cover Policy drafting in progress",
          "Green Cover Policy finalized",
          "Green Cover Policy finalized and shared with stakeholders",
        ],
      },
      {
        key: "q5_2",
        label: "5.2 Status of Green Coverage Area",
        options: ["(<10%)", "(10-25%)", "(25-50%)", "(>50%)"],
      },
      {
        key: "q5_3",
        label: "5.3 Status of Green Landscapes",
        options: [
          "High water using non-native species + no smart irrigation",
          "High water using non-native species + smart irrigation",
          "Native species + no smart irrigation",
          "Native species + smart irrigation",
        ],
      },
      {
        key: "q5_4",
        label: "5.4 Status of Green Roofs & Green Walls",
        options: [
          "None",
          "Plans for Green Roofs & Green Walls in place",
          "Green Roofs operational",
          "Green Roofs + Green Walls operational",
          "Not Applicable",
        ],
        notApplicableValue: -1,
      },
    ],
  },
];

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
  let maxScore = 0;
  section.questions.forEach((q) => {
    const value = Number(form[q.key]);
    if (q.notApplicableValue !== undefined && value === q.notApplicableValue)
      return;
    if (!isNaN(value)) {
      score += value;
      maxScore += 3;
    }
  });
  return { score, maxScore };
}

function calculateOverallAverage(form, sections) {
  let totalScore = 0;
  let totalQuestions = 0;
  let maxScore = 0;

  sections.forEach((section) => {
    section.questions.forEach((q) => {
      const value = Number(form[q.key]);
      if (q.notApplicableValue !== undefined && value === q.notApplicableValue)
        return;
      if (!isNaN(value)) {
        totalScore += value;
        totalQuestions += 1;
        maxScore += 3;
      }
    });
  });

  const avg = totalQuestions > 0 ? totalScore / totalQuestions : 0;
  return {
    avg: parseFloat(avg.toFixed(2)),
    totalScore,
    totalQuestions,
    maxScore,
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

  const { avg, totalScore, totalQuestions, maxScore } = calculateOverallAverage(
    form,
    sections
  );
  const maturity = getMaturityLevel(avg);
  const overallColor = getColorForScore(avg);

  useEffect(() => {
    if (submittedRef.current) return;

    submittedRef.current = true; // Mark as submitted before fetch

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
        <h4>Thank you, {form.fullName},Your responses has been successfully submitted.</h4> 

      </Typography>
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
        Summary of your Results:
      </Typography>

      {/* {submitError && (
        <Typography color="error" sx={{ textAlign: "center", mb: 2 }}>
          Error submitting data: {submitError}
        </Typography>
      )} */}

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
        const { score, maxScore } = calculateSectionScore(section, form);
        const validQuestionsCount = section.questions.filter((q) => {
          const val = Number(form[q.key]);
          return !(
            q.notApplicableValue !== undefined && val === q.notApplicableValue
          );
        }).length;
        const sectionAvg =
          maxScore > 0 && validQuestionsCount > 0
            ? score / validQuestionsCount
            : 0;
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
