import React from "react";

function ProgressBar(props) {
  const step = props.step;
  const steps = ["Datum & tid", "Bord", "Uppgifter", "Bekräftelse"];

  return (
    <div>
      {steps.map(function(s, index) {
        let textStyle = {};
        if (step === index + 1) {
          textStyle = { fontWeight: "bold" };
        }

        return (
          <span key={index} style={textStyle}>
            {s}{" "}
          </span>
        );
      })}
    </div>
  );
}

export default ProgressBar;