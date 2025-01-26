import React, { useState } from 'react';

const calculateMortgage = (amount, term, rate) => {
  // Your mortgage calculation logic here
  return (amount * rate) / (1 - Math.pow(1 + rate, -term));
};

const InterestRateSensitivity = ({
  mortgageAmount,
  loanTerm,
  interestRate,
  setInterestRate,
  monthlyPayment,
  setMonthlyPayment,
}) => {
  const handleInterestRateChange = (event) => {
    const newRate = parseFloat(event.target.value);
    setInterestRate(newRate);
    setMonthlyPayment(calculateMortgage(mortgageAmount, loanTerm, newRate));
  };

  return (
    <div>
      <h2>Interest Rate Sensitivity</h2>
      <div>
        <label htmlFor="interestRate">Interest Rate: </label>
        <input
          type="range"
          id="interestRate"
          min="1"
          max="10"
          step="0.1"
          value={interestRate}
          onChange={handleInterestRateChange}
        />
      </div>

      <div className="results">
        <h3>Monthly Payment: ${monthlyPayment.toFixed(2)}</h3>
        <p>This is your new monthly payment based on the adjusted interest rate.</p>
      </div>
    </div>
  );
};

export default InterestRateSensitivity;