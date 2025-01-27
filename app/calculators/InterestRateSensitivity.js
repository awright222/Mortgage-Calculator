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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Interest Rate Sensitivity</h2>
      <div>
        <label htmlFor="interestRate" className="block text-black font-medium mb-1">Interest Rate: </label>
        <input
          type="range"
          id="interestRate"
          min="1"
          max="10"
          step="0.1"
          value={interestRate}
          onChange={handleInterestRateChange}
          className="w-full"
        />
      </div>

      <div className="results mt-4">
        <h3 className="text-xl font-semibold">Monthly Payment: ${monthlyPayment.toFixed(2)}</h3>
        <p className="text-black">This is your new monthly payment based on the adjusted interest rate.</p>
      </div>
    </div>
  );
};

export default InterestRateSensitivity;