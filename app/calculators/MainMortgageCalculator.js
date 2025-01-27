import { useState } from "react";
import TaxesInsuranceCalculator from "./TaxesInsuranceCalculator";
import SlideMenuDots from "./SlideMenuDots";
import AmortizationSchedule from "./AmortizationSchedule";

const formatUSD = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export default function MainMortgageCalculator() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [loanAmount, setLoanAmount] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [homeValue, setHomeValue] = useState(0);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termLength, setTermLength] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0); 
  const [taxRate, setTaxRate] = useState('');
  const [insuranceCost, setInsuranceCost] = useState('');
  const [escrow, setEscrow] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [insurance, setInsurance] = useState(0); 
  const [mortgageDetails, setMortgageDetails] = useState({
    loanAmount: 0,
    downPayment: 0,
    extraPayment: 0,
    homeValue: 0,
    taxes: 0,
    insurance: 0,
    escrow: 0,
  });

  const calculateRepayments = () => {
    const principal = homeValue - downPayment;

    if (principal <= 0 || termLength <= 0) {
      alert("Please ensure all inputs are valid and greater than zero.");
      setMonthlyPayment(0);
      setTotalRepayment(0);
      setTotalInterest(0);
      return;
    }

    const monthlyRate = interestRate / 100 / 12; 
    const totalMonths = termLength * 12; 

    let monthlyPayment = 0;
    let totalRepayment = 0;
    let totalInterest = 0; 

    if (monthlyRate > 0) {
      monthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
      totalRepayment = monthlyPayment * totalMonths;
      totalInterest = totalRepayment - principal; 
    } else {
      monthlyPayment = principal / totalMonths;
      totalRepayment = principal; 
      totalInterest = 0;
    }

    setMonthlyPayment(monthlyPayment || 0);
    setTotalRepayment(totalRepayment || 0);
    setTotalInterest(totalInterest || 0); 
  };

  const slides = [
    <div className="w-1/2 bg-white p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#023047]" >Mortgage Calculator</h1>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="homeValue"
            className="block text-gray-700 font-medium mb-1"
          >
            Home Value
          </label>
          <input
            type="number"
            id="homeValue"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFB703] text-black"
            value={homeValue}
            onChange={(e) => {
              const newHomeValue = Math.max(0, parseFloat(e.target.value) || 0); 
              setHomeValue(newHomeValue);
              setMortgageDetails((prevDetails) => ({
                ...prevDetails,
                homeValue: newHomeValue,
              }));
            }}
            placeholder={formatUSD(0)}
          />
        </div>
        <div>
          <label
            htmlFor="downPayment"
            className="block text-gray-700 font-medium mb-1"
          >
            Down Payment
          </label>
          <input
            type="number"
            id="downPayment"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFB703] text-black"
            value={downPayment}
            onChange={(e) => {
              const newDownPayment = Math.max(
                0,
                parseFloat(e.target.value) || 0
              ); 
              if (newDownPayment > homeValue) {
                alert("Down payment cannot exceed the home value.");
                return;
              }
              setDownPayment(newDownPayment);
              setMortgageDetails((prevDetails) => ({
                ...prevDetails,
                downPayment: newDownPayment,
                loanAmount: homeValue - newDownPayment,
              }));
            }}
            placeholder={formatUSD(0)}
          />
        </div>
        <div>
          <label
            htmlFor="interestRate"
            className="block text-gray-700 font-medium mb-1"
          >
            Interest Rate (%)
          </label>
          <input
            type="number"
            id="interestRate"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFB703] text-black"
            value={interestRate}
            onChange={(e) =>
              setInterestRate(Math.max(0, parseFloat(e.target.value) || 0))
            } 
          />
        </div>
        <div>
          <label
            htmlFor="termLength"
            className="block text-gray-700 font-medium mb-1"
          >
            Term Length (years)
          </label>
          <input
            type="number"
            id="termLength"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFB703] text-black"
            value={termLength}
            onChange={(e) =>
              setTermLength(Math.max(0, parseInt(e.target.value) || 0))
            } 
          />
        </div>
        <div>
          <button
            className="w-full bg-[#FFB703] text-white rounded-lg py-2 font-semibold hover:bg-[#023047]"
            onClick={calculateRepayments}
          >
            Calculate Repayments
          </button>
        </div>
      </div>
    </div>,
    <div className="w-1/2 bg-white p-8">
      <TaxesInsuranceCalculator
        setMortgageDetails={setMortgageDetails}
        monthlyPayment={monthlyPayment}
        setMonthlyPayment={setMonthlyPayment}
        totalRepayment={totalRepayment}
        setTotalRepayment={setTotalRepayment}
        termLength={termLength}
        homeValue={homeValue}
        setHomeValue={setHomeValue}
        taxRate={taxRate} 
        setTaxRate={setTaxRate}
        insuranceCost={insuranceCost}
        setInsuranceCost={setInsuranceCost}
        setEscrow={setEscrow} 
        setTaxes={setTaxes} 
        setInsurance={setInsurance} 
      />
    </div>,
    <div className="w-1/2 bg-white p-8">
      <AmortizationSchedule
        loanAmount={mortgageDetails.loanAmount}
        interestRate={interestRate}
        termLength={termLength}
        monthlyPayment={monthlyPayment}
      />
    </div>,
  ];

  return (
    <div className="bg-[lightBlue-100] p-12 min-h-screen flex flex-col items-center justify-center"> 
      <div className="bg-white rounded-2xl shadow-lg flex overflow-hidden max-w-6xl w-full mb-8"> 
        {slides[currentSlide]}
        <div className="w-1/2 bg-[#023047] p-12 text-white relative custom-rounded-corner"> 
          <h2 className="text-xl font-semibold mb-4">Your Results</h2>
          <p className="mt-4">
            Your results are shown below based on the information you provided. To adjust the results, edit the form and click "Calculate Repayments" again. Use the slide dots below to provide more detailed information for your calculations.
          </p>
          <div className="bg-[#050535] p-6 rounded-lg mt-4 relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#FFB703] rounded-t-lg"></div>
            <h3 className="text-lg font-semibold">Your Monthly Repayments</h3>
            <p className="text-2xl font-bold mb-4" style={{ color: '#FFB703' }}>{formatUSD(monthlyPayment)}</p>
            <p className="text-lg mb-6">Total Repayment: {formatUSD(totalRepayment)}</p>
            <p className="text-lg mb-6">Total Interest: {formatUSD(totalInterest)}</p> 
            <hr className="border-t border-gray-300 my-4" />
            <h3 className="text-lg font-semibold">Monthly Taxes and Insurance</h3>
            <p>Property Taxes: ${taxes.toFixed(2)}</p>
            <p>Home Insurance: ${insurance.toFixed(2)}</p>
            <p>Total Escrow: ${escrow.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <SlideMenuDots
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        totalSlides={slides.length}
        className="main-mortgage-calculator-dots"
        data-testid="main-mortgage-calculator-dots"
      />
    </div>
  );
}