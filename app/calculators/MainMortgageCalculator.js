import ExtraPaymentOptions from './ExtraPaymentOptions';
import TaxesInsuranceCalculator from './TaxesInsuranceCalculator';
import SlideMenuDots from './SlideMenuDots';

const formatUSD = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export default function MainMortgageCalculator({
  loanAmount,
  downPayment,
  setLoanAmount,
  setDownPayment,
  setMortgageDetails,
  interestRate,
  setInterestRate,
  termLength,
  setTermLength,
  calculateRepayments,
  monthlyPayment,
  setMonthlyPayment,
  totalRepayment,
  setTotalRepayment,
  currentSlide,
  setCurrentSlide,
}) {
  const handleLoanAmountChange = (e) => {
    const newLoanAmount = parseFloat(e.target.value) || 0;
    setLoanAmount(newLoanAmount);
    setMortgageDetails((prevDetails) => ({
      ...prevDetails,
      loanAmount: newLoanAmount,
    }));
  };

  const handleDownPaymentChange = (e) => {
    const newDownPayment = parseFloat(e.target.value) || 0;
    setDownPayment(newDownPayment);
    setMortgageDetails((prevDetails) => ({
      ...prevDetails,
      downPayment: newDownPayment,
      loanAmount: prevDetails.homeValue - newDownPayment,
    }));
  };

  const slides = [
    <div className="w-1/2 bg-white p-8">
      <h1 className="text-2xl font-bold mb-6">Mortgage Calculator</h1>
      <div className="space-y-6">
        <div>
          <label htmlFor="homeValue" className="block text-gray-700 font-medium mb-1">
            Home Value
          </label>
          <input
            type="number"
            id="homeValue"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            value={loanAmount + downPayment}
            onChange={handleLoanAmountChange}
            placeholder={formatUSD(0)}
          />
        </div>
        <div>
          <label htmlFor="downPayment" className="block text-gray-700 font-medium mb-1">
            Down Payment
          </label>
          <input
            type="number"
            id="downPayment"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            value={downPayment}
            onChange={handleDownPaymentChange}
            placeholder={formatUSD(0)} 
          />
        </div>
        <div>
          <label htmlFor="interestRate" className="block text-gray-700 font-medium mb-1">
            Interest Rate (%)
          </label>
          <input
            type="number"
            id="interestRate"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div>
          <label htmlFor="termLength" className="block text-gray-700 font-medium mb-1">
            Term Length (years)
          </label>
          <input
            type="number"
            id="termLength"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            value={termLength}
            onChange={(e) => setTermLength(parseInt(e.target.value) || 0)}
          />
        </div>
        <div>
          <button
            className="w-full bg-[#FFB703] text-white rounded-lg py-2 font-semibold hover:bg-green-600"
            onClick={calculateRepayments}
          >
            Calculate Repayments
          </button>
        </div>
      </div>
    </div>,
    <ExtraPaymentOptions
      loanAmount={loanAmount}
      downPayment={downPayment}
      setLoanAmount={setLoanAmount}
      setDownPayment={setDownPayment}
      setMortgageDetails={setMortgageDetails}
      monthlyPayment={monthlyPayment}
      setMonthlyPayment={setMonthlyPayment}
      totalRepayment={totalRepayment}
      setTotalRepayment={setTotalRepayment}
    />,
    <TaxesInsuranceCalculator
      setMortgageDetails={setMortgageDetails}
      monthlyPayment={monthlyPayment}
      setMonthlyPayment={setMonthlyPayment}
      totalRepayment={totalRepayment}
      setTotalRepayment={setTotalRepayment}
    />,
  ];

  return (
    <div className="bg-lightBlue-100 p-8 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg flex overflow-hidden max-w-5xl w-full">
        {slides[currentSlide]}
        <div className="w-1/2 bg-[#023047] p-8 text-white">
          <h2 className="text-xl font-semibold mb-4">Your Results</h2>
          <p className="text-lg mb-6">
            Your results are shown below based on the information you provided. To adjust, edit the form and recalculate.
          </p>
          <div className="bg-[#023047] border border-yellow-400 rounded-lg p-4">
            <p className="text-2xl font-bold">
              Monthly Payment: {formatUSD(monthlyPayment)}
            </p>
            <p className="mt-2 text-sm">Total you'll repay over the term:</p>
            <p className="font-medium text-lg">{formatUSD(totalRepayment)}</p>
          </div>
        </div>
      </div>
      <SlideMenuDots
        totalSlides={slides.length}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
    </div>
  );
}