import React from 'react';

export default function AmortizationSchedule({ loanAmount, interestRate, termLength, monthlyPayment }) {
  const calculateSchedule = () => {
    const schedule = [];
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = termLength * 12;

    let remainingBalance = loanAmount;

    for (let i = 1; i <= totalMonths; i++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month: i,
        interest: interestPayment,
        principal: principalPayment,
        remainingBalance: Math.max(remainingBalance, 0),
      });

      // Prevent negative remaining balance due to floating-point precision issues
      if (remainingBalance <= 0) break;
    }

    return schedule;
  };

  const schedule = calculateSchedule();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Amortization Schedule</h1>
      <div className="overflow-y-auto max-h-96">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-2 py-1 text-black">Month</th>
              <th className="border border-gray-300 px-2 py-1 text-black">Principal</th>
              <th className="border border-gray-300 px-2 py-1 text-black">Interest</th>
              <th className="border border-gray-300 px-2 py-1 text-black">Remaining Balance</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map(({ month, principal, interest, remainingBalance }) => (
              <tr key={month}>
                <td className="border border-gray-300 px-2 py-1 text-center text-black">{month}</td>
                <td className="border border-gray-300 px-2 py-1 text-right text-black">
                  {principal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right text-black">
                  {interest.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-right text-black">
                  {remainingBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}