import { useState } from 'react';

const TaxesInsuranceCalculator = ({
  setMortgageDetails,
  monthlyPayment,
  setMonthlyPayment,
  totalRepayment,
  setTotalRepayment,
}) => {
  const [homeValue, setHomeValue] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [insuranceCost, setInsuranceCost] = useState('');
  const [escrow, setEscrow] = useState(0);

  const handleHomeValueChange = (e) => {
    setHomeValue(e.target.value);
  };

  const handleTaxRateChange = (e) => {
    setTaxRate(e.target.value);
  };

  const handleInsuranceCostChange = (e) => {
    setInsuranceCost(e.target.value);
  };

  const calculateTaxesAndInsurance = () => {
    const calculatedTaxes = (homeValue * (taxRate / 100)) / 12; // Monthly property tax
    const calculatedInsurance = insuranceCost / 12; // Monthly insurance cost
    const calculatedEscrow = calculatedTaxes + calculatedInsurance;

    setEscrow(calculatedEscrow);

    // Optionally update mortgage details with taxes and insurance
    setMortgageDetails((prevDetails) => ({
      ...prevDetails,
      taxes: calculatedTaxes,
      insurance: calculatedInsurance,
      escrow: calculatedEscrow,
    }));

    // Adjust the monthly payment and total repayment based on the escrow
    const newMonthlyPayment = monthlyPayment + calculatedEscrow;
    const newTotalRepayment = totalRepayment + (calculatedEscrow * 12 * termLength);

    setMonthlyPayment(newMonthlyPayment);
    setTotalRepayment(newTotalRepayment);
  };

  return (
    <div className="taxes-insurance-calculator">
      <h2>Taxes & Insurance Calculator</h2>
      
      <div>
        <label htmlFor="homeValue">Home Value ($): </label>
        <input
          type="number"
          id="homeValue"
          value={homeValue}
          onChange={handleHomeValueChange}
        />
      </div>

      <div>
        <label htmlFor="taxRate">Annual Property Tax Rate (%): </label>
        <input
          type="number"
          id="taxRate"
          value={taxRate}
          onChange={handleTaxRateChange}
        />
      </div>

      <div>
        <label htmlFor="insuranceCost">Annual Insurance Cost ($): </label>
        <input
          type="number"
          id="insuranceCost"
          value={insuranceCost}
          onChange={handleInsuranceCostChange}
        />
      </div>

      <button onClick={calculateTaxesAndInsurance}>Calculate</button>

      <div className="results">
        <h3>Monthly Taxes and Insurance</h3>
        <p>Property Taxes: ${((homeValue * (taxRate / 100)) / 12).toFixed(2)}</p>
        <p>Home Insurance: ${(insuranceCost / 12).toFixed(2)}</p>
        <p>Total Escrow: ${escrow.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default TaxesInsuranceCalculator;