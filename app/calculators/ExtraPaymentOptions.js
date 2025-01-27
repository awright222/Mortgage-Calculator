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
    termLength,
  }) {
    const [extraPayment, setExtraPayment] = useState(0);
  
    const handleExtraPaymentChange = (e) => {
      const extra = parseFloat(e.target.value);
      setExtraPayment(extra);
  
    
      setMortgageDetails((prevDetails) => ({
        ...prevDetails,
        extraPayment: extra,
       
      }));

     
      const newMonthlyPayment = monthlyPayment - extra;
      const newTotalRepayment = totalRepayment - (extra * 12 * termLength);

      setMonthlyPayment(newMonthlyPayment);
      setTotalRepayment(newTotalRepayment);
    };
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Extra Payment Options</h1>
  
        <div>
          <label htmlFor="extraPayment" className="block text-black font-medium mb-1">Extra Monthly Payment: </label>
          <input
            type="number"
            id="extraPayment"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            value={extraPayment}
            onChange={handleExtraPaymentChange}
          />
        </div>
      </div>
    );
}