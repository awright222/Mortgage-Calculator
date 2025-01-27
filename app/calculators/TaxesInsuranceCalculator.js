import { useState } from "react";

const TaxesInsuranceCalculator = ({
  setMortgageDetails,
  monthlyPayment,
  setMonthlyPayment,
  totalRepayment,
  setTotalRepayment,
  termLength,
  homeValue,
  setHomeValue,
  taxRate,
  setTaxRate,
  insuranceCost,
  setInsuranceCost,
  setEscrow,
  setTaxes,
  setInsurance,
}) => {
  const [escrow, setLocalEscrow] = useState(0);
  const [results, setResults] = useState({ propertyTaxes: 0, homeInsurance: 0, totalEscrow: 0 });


  const [prevInputs, setPrevInputs] = useState({
    homeValue: 0,
    taxRate: 0,
    insuranceCost: 0,
  });

  const handleHomeValueChange = (e) => {
    const newHomeValue = parseFloat(e.target.value) || 0;
    setHomeValue(newHomeValue);
  };

  const handleTaxRateChange = (e) => setTaxRate(e.target.value);
  const handleInsuranceCostChange = (e) => setInsuranceCost(e.target.value);

  const calculateTaxesAndInsurance = () => {

    if (
      prevInputs.homeValue === homeValue &&
      prevInputs.taxRate === taxRate &&
      prevInputs.insuranceCost === insuranceCost
    ) {
      return;
    }

    const taxRateNum = parseFloat(taxRate) || 0;
    const insuranceCostNum = parseFloat(insuranceCost) || 0;

    const calculatedTaxes = (homeValue * (taxRateNum / 100)) / 12;
    const calculatedInsurance = insuranceCostNum / 12;
    const calculatedEscrow = calculatedTaxes + calculatedInsurance;

    setLocalEscrow(calculatedEscrow);
    setEscrow(calculatedEscrow);
    setTaxes(calculatedTaxes);
    setInsurance(calculatedInsurance);

    setMortgageDetails((prevDetails) => ({
      ...prevDetails,
      taxes: calculatedTaxes,
      insurance: calculatedInsurance,
      escrow: calculatedEscrow,
    }));

    const newMonthlyPayment = monthlyPayment + calculatedEscrow - escrow;
    const newTotalRepayment =
      totalRepayment + calculatedEscrow * 12 * termLength - escrow * 12 * termLength;

    setMonthlyPayment(newMonthlyPayment);
    setTotalRepayment(newTotalRepayment);

    setResults({ propertyTaxes: calculatedTaxes, homeInsurance: calculatedInsurance, totalEscrow: calculatedEscrow });

    
    setPrevInputs({ homeValue, taxRate, insuranceCost });
  };

  return (
    <div className="taxes-insurance-calculator text-[#023047]">
      <h2 className="text-2xl font-bold mb-4">Taxes & Insurance Calculator</h2>
      <div className="mb-4">
        <label htmlFor="homeValue" className="block text-black font-medium mb-1">
          Home Value ($):
        </label>
        <input
          type="number"
          id="homeValue"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFB703] text-black"
          value={homeValue}
          onChange={handleHomeValueChange}
          min="0"
          aria-label="Home Value in dollars"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="taxRate" className="block text-black font-medium mb-1">
          Annual Property Tax Rate (%):
        </label>
        <input
          type="number"
          id="taxRate"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFB703] text-black"
          value={taxRate}
          onChange={handleTaxRateChange}
          min="0"
          aria-label="Annual property tax rate percentage"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="insuranceCost" className="block text-black font-medium mb-1">
          Annual Insurance Cost ($):
        </label>
        <input
          type="number"
          id="insuranceCost"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFB703] text-black"
          value={insuranceCost}
          onChange={handleInsuranceCostChange}
          min="0"
          aria-label="Annual insurance cost in dollars"
        />
      </div>
      <button
        className="w-full bg-[#FFB703] text-white rounded-lg py-2 font-semibold hover:bg-[#023047] mt-4"
        onClick={calculateTaxesAndInsurance}
      >
        Calculate
      </button>
      {/* <div className="results mt-4">
        <h3 className="text-lg font-semibold">Monthly Taxes and Insurance</h3>
        <p>Property Taxes: ${results.propertyTaxes.toFixed(2)}</p>
        <p>Home Insurance: ${results.homeInsurance.toFixed(2)}</p>
        <p>Total Escrow: ${results.totalEscrow.toFixed(2)}</p>
      </div> */}
    </div>
  );
};

export default TaxesInsuranceCalculator;
