// PairingDisplay.tsx
import React from "react";
import { useParams } from "react-router-dom";
import "./pair.css";

interface PairingDisplayProps {
  pairing: string;
  name: string;
}

const PairingDisplay: React.FC = () => {
  const { pairing, name } = useParams<{ pairing: string; name: string }>();

  return (
    <div>
      <div className="wrapper">
        <div className="content">
          <h3 className="title">Hi {name}! You've been paired with</h3>
          <h1 className="pairing">{pairing}</h1>
          <h3 className="title">Goodluck!</h3>
        </div>
      </div>
    </div>
  );
};

export default PairingDisplay;
