import React, { useRef, useState } from "react";
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import Start from "./pages/Start";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";
import Page6 from "./pages/Page6";
import Page7 from "./pages/Page7";
import Page8 from "./pages/Page8";
import Success from "./pages/Success";
import Preview from "./pages/Preview";
import Banner from "./components/Banner";

import sections from "./pages/sections";

const steps = [
  "Start",
  "About Farmer",
  "Farm Assessed",
  "Soil Health Assessment",
  "Biodiversity & Crop ",
  "Pest, Disease",
  "Integration Livestock",
  "Water,Soil Moisture",
  "Preview",
  "Success",
];

function getDefaultForm() {
  return {
    fullName: "",
    email: "",
    whatsapp: "",
    date: "",
    submittedAt: new Date().toISOString(),
  };
}

const initialForm = getDefaultForm();

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [clearDialog, setClearDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);

  const handleNext = (data = {}) => {
    setForm((prev) => ({ ...prev, ...data }));
    setActiveStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClear = () => setClearDialog(true);

  const confirmClear = () => {
    setForm(getDefaultForm());
    setActiveStep(0);
    setClearDialog(false);
    setIsEditing(false);
  };

  const cancelClear = () => setClearDialog(false);

  const handleRestart = () => {
    setForm(getDefaultForm());
    setActiveStep(0);
    setIsEditing(false);
  };

  const getStepContent = (step) => {
    const pageProps = {
      onNext: handleNext,
      onBack: handleBack,
      form,
      formRef,
    };

    switch (step) {
      case 0:
        return <Start onNext={handleNext} />;
      case 1:
        return <Page2 {...pageProps} />;
      case 2:
        return <Page3 {...pageProps} />;
      case 3:
        return <Page4 {...pageProps} />;
      case 4:
        return <Page5 {...pageProps} />;
      case 5:
        return <Page6 {...pageProps} />;
      case 6:
        return <Page7 {...pageProps} />;
      case 7:
        return <Page8 {...pageProps} />;
      case 8:
        return (
          <Preview
            form={form}
            onEdit={() => {
              setActiveStep(1);
              setIsEditing(true);
            }}
            onSubmit={() => setActiveStep(steps.length - 1)}
            sections={sections}
          />
        );
      case 9:
        return (
          <Success form={form} onRestart={handleRestart} sections={sections} />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {activeStep !== 0 && <Banner />}

      {activeStep !== steps.length - 1 && (
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            // Decide if step label should be clickable
            const isClickable =
              isEditing && index !== 0 && index !== steps.length - 1;

            return (
              <Step key={label}>
                <StepLabel
                  {...(isClickable
                    ? {
                        onClick: () => setActiveStep(index),
                        style: { cursor: "pointer" },
                      }
                    : {})}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )}

      <Box sx={{ mt: 4}} ref={formRef}>
        {getStepContent(activeStep)}
      </Box>

      {activeStep > 0 && activeStep < steps.length - 1 && (
        <Box sx={{ mt: 2, mb: 7, display: "flex", justifyContent: "space-between" }}>
          <Button color="error" variant="outlined" onClick={handleClear}>
            Clear Form
          </Button>
        </Box>
      )}

      <Dialog open={clearDialog} onClose={cancelClear}>
        <DialogTitle>Clear Form</DialogTitle>
        <DialogContent>
          This action will clear all form fields and cannot be undone. Would you
          like to proceed?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelClear}>Cancel</Button>
          <Button color="error" onClick={confirmClear}>
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
