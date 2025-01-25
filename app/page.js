"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    amount: "",
    term: "",
    rate: "",
    type: "repayment",
    currency: "USD",
  });

  const [results, setResults] = useState(null);

  const currencySymbols = {
    USD: "$",
    GBP: "£",
    EUR: "€",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
    CHF: "CHF",
    CNY: "¥",
    SEK: "kr",
    NZD: "NZ$",
    MXN: "Mex$",
    SGD: "S$",
    HKD: "HK$",
    NOK: "kr",
    KRW: "₩",
    INR: "₹",
    BRL: "R$",
    ZAR: "R",
    TRY: "₺",
    RUB: "₽",
    AED: "د.إ",
    SAR: "﷼",
    THB: "฿",
    MYR: "RM",
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, term, rate, type } = formData;

    const principal = parseFloat(amount);
    const monthlyRate = parseFloat(rate) / 100 / 12;
    const totalMonths = parseInt(term) * 12;

    let monthlyPayment;
    if (type === "repayment") {
      monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));
    } else {
      monthlyPayment = principal * monthlyRate;
    }

    const totalRepayment = monthlyPayment * totalMonths;

    setResults({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalRepayment: totalRepayment.toFixed(2),
    });
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">
       
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Mortgage Calculator</h1>
            <button
              onClick={() =>
                setFormData({ amount: "", term: "", rate: "", type: "repayment", currency: "USD" })
              }
              className="text-sm text-blue-500 hover:underline"
            >
              Clear All
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
          
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none"
              >
                {Object.keys(currencySymbols).map((currency) => (
                  <option key={currency} value={currency}>
                    {currencySymbols[currency]} {currency}
                  </option>
                ))}
              </select>
            </div>

           
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Mortgage Amount
              </label>
              <div className="mt-1 flex">
                <span className="inline-flex items-center px-3 bg-gray-100 text-gray-600 border border-gray-300 rounded-l-md">
                  {currencySymbols[formData.currency]}
                </span>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="flex-1 block w-full p-2 border border-gray-300 rounded-r-md focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="term" className="block text-sm font-medium text-gray-700">
                  Mortgage Term
                </label>
                <div className="mt-1 flex">
                  <input
                    type="number"
                    id="term"
                    name="term"
                    value={formData.term}
                    onChange={handleChange}
                    className="flex-1 block w-full p-2 border border-gray-300 rounded-l-md focus:outline-none"
                    required
                  />
                  <span className="inline-flex items-center px-3 bg-gray-100 text-gray-600 border border-gray-300 rounded-r-md">
                    years
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor="rate" className="block text-sm font-medium text-gray-700">
                  Interest Rate
                </label>
                <div className="mt-1 flex">
                  <input
                    type="number"
                    id="rate"
                    name="rate"
                    value={formData.rate}
                    onChange={handleChange}
                    className="flex-1 block w-full p-2 border border-gray-300 rounded-l-md focus:outline-none"
                    step="0.01"
                    required
                  />
                  <span className="inline-flex items-center px-3 bg-gray-100 text-gray-600 border border-gray-300 rounded-r-md">
                    %
                  </span>
                </div>
              </div>
            </div>

            
            <div>
              <span className="block text-sm font-medium text-gray-700">Mortgage Type</span>
              <div className="mt-2 flex items-center gap-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="repayment"
                    checked={formData.type === "repayment"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Repayment
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="interest-only"
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Interest Only
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-white py-3 rounded-md text-lg font-medium hover:bg-yellow-500"
            >
              Calculate Repayments
            </button>
          </form>
        </div>

       
        <div className="bg-gray-900 text-white p-8 rounded-r-lg flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-4">Your Results</h2>
          {results ? (
            <>
              <p className="text-4xl font-bold mb-4">
                {currencySymbols[formData.currency]}
                {results.monthlyPayment}
              </p>
              <p className="text-lg">Your monthly repayments</p>
              <hr className="my-4 border-gray-700" />
              <p>Total you'll repay over the term</p>
              <p className="text-xl font-bold mt-2">
                {currencySymbols[formData.currency]}
                {results.totalRepayment}
              </p>
            </>
          ) : (
            <p className="text-gray-400">
              Enter the details on the left and click "Calculate Repayments" to see the results.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
