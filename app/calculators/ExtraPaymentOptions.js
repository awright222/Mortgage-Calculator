import React, { useState } from 'react';

export default function ExtraPaymentOptions({
    loanAmount,
    downPayment,
    setLoanAmount,
    setDownPayment,
    setMortgageDetails,
    monthlyPayment,
    setMonthlyPayment,
    totalRepayment,
    setTotalRepayment,
  }) {
    const [extraPayment, setExtraPayment] = useState(0);
  
    const handleExtraPaymentChange = (e) => {
      const extra = parseFloat(e.target.value);
      setExtraPayment(extra);
  
      // Update mortgage details, e.g., reducing loan term or showing interest savings
      setMortgageDetails((prevDetails) => ({
        ...prevDetails,
        extraPayment: extra,
        // Adjust calculations based on the extra payment
      }));

      // Adjust the monthly payment and total repayment based on the extra payment
      const newMonthlyPayment = monthlyPayment - extra;
      const newTotalRepayment = totalRepayment - (extra * 12 * termLength);

      setMonthlyPayment(newMonthlyPayment);
      setTotalRepayment(newTotalRepayment);
    };
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Extra Payment Options</h1>
  
        <div>
          <label htmlFor="extraPayment">Extra Monthly Payment: </label>
          <input
            type="number"
            id="extraPayment"
            value={extraPayment}
            onChange={handleExtraPaymentChange}
          />
        </div>
      </div>
    );
}