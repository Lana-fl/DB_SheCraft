// StepperHeader.js
import React from "react";

export default function StepsBar({ currentStep, setCurrentStep }) {
  const steps = ["Customize Your Ring", "Choose Your Designer", "Checkout"];

  return (
    <div className="steps-horizontal">
      {steps.map((label, index) => (
        <div
          key={index}
          className={`step-box ${currentStep === index + 1 ? "active" : ""}`}
          onClick={() => setCurrentStep(index + 1)}
        >
          <div className="step-number">{index + 1}</div>
          <div className="step-labels">{label}</div>
        </div>
      ))}
    </div>
  );
}
