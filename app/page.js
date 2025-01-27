'use client';

import { useState } from 'react';
import MainMortgageCalculator from './calculators/MainMortgageCalculator.js';
import TaxesInsuranceCalculator from './calculators/TaxesInsuranceCalculator.js';
import AmortizationSchedule from './calculators/AmortizationSchedule.js';
import SlideMenuDots from './calculators/SlideMenuDots.js';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [loanAmount, setLoanAmount] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termLength, setTermLength] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);
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
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = termLength * 12;

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalRepayment = monthlyPayment * totalMonths;

    setMonthlyPayment(monthlyPayment || 0);
    setTotalRepayment(totalRepayment || 0);
  };

  const slides = [
    <MainMortgageCalculator
      loanAmount={loanAmount}
      downPayment={downPayment}
      setLoanAmount={setLoanAmount}
      setDownPayment={setDownPayment}
      setMortgageDetails={setMortgageDetails}
      interestRate={interestRate}
      setInterestRate={setInterestRate}
      termLength={termLength}
      setTermLength={setTermLength}
      calculateRepayments={calculateRepayments}
      monthlyPayment={monthlyPayment}
      setMonthlyPayment={setMonthlyPayment}
      totalRepayment={totalRepayment}
      setTotalRepayment={setTotalRepayment}
      currentSlide={currentSlide}
      setCurrentSlide={setCurrentSlide}
    />,
    <TaxesInsuranceCalculator
      setMortgageDetails={setMortgageDetails}
      monthlyPayment={monthlyPayment}
      setMonthlyPayment={setMonthlyPayment}
      totalRepayment={totalRepayment}
      setTotalRepayment={setTotalRepayment}
      termLength={termLength}
    />,
    <AmortizationSchedule
      loanAmount={loanAmount - downPayment}
      interestRate={interestRate}
      termLength={termLength}
      monthlyPayment={monthlyPayment}
    />,
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-12"> {/* Increased padding */}
      <div className="w-full max-w-6xl mb-8"> {/* Increased width */}
        {slides[currentSlide]}
      </div>
      <SlideMenuDots
        totalSlides={slides.length}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
    </div>
  );
}