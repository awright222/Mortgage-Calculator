import { useState } from 'react';

const LoanTypes = ({ setLoanType, setMortgageDetails }) => {
  const [selectedLoanType, setSelectedLoanType] = useState('Fixed-Rate');

  const handleLoanTypeChange = (event) => {
    const loanType = event.target.value;
    setSelectedLoanType(loanType);
    setLoanType(loanType);

    // Update mortgage details based on loan type (optional)
    // For example, you could adjust the interest rate or terms for different loan types
    if (loanType === 'Fixed-Rate') {
      setMortgageDetails({ interestRate: 4.0 });
    } else if (loanType === 'Adjustable-Rate') {
      setMortgageDetails({ interestRate: 3.5 });
    } else if (loanType === 'FHA') {
      setMortgageDetails({ interestRate: 3.25 });
    } else if (loanType === 'VA') {
      setMortgageDetails({ interestRate: 2.75 });
    }
  };

  return (
    <div className="loan-types">
      <h2>Select Loan Type</h2>
      <div>
        <label htmlFor="loan-type-selector">Loan Type:</label>
        <select
          id="loan-type-selector"
          value={selectedLoanType}
          onChange={handleLoanTypeChange}
        >
          <option value="Fixed-Rate">Fixed-Rate</option>
          <option value="Adjustable-Rate">Adjustable-Rate</option>
          <option value="FHA">FHA</option>
          <option value="VA">VA</option>
        </select>
      </div>

      <div className="loan-details">
        <h3>Selected Loan Type: {selectedLoanType}</h3>
        <p>Interest Rate: {selectedLoanType === 'Fixed-Rate' ? '4.0%' : 
                           selectedLoanType === 'Adjustable-Rate' ? '3.5%' :
                           selectedLoanType === 'FHA' ? '3.25%' : '2.75%'}</p>
      </div>
    </div>
  );
};

export default LoanTypes;
