import React from "react";

const BalanceSummary = ({ balance, totalIncome, totalExpense }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5 text-center">
        <div className="bg-gray-200 p-5 rounded-lg">
          <h2 className="text-xl font-bold">BDT {balance}</h2>
          <p>Balance</p>
        </div>
        <div className="bg-gray-200 p-5 rounded-lg">
          <h2 className="text-xl font-bold">BDT {totalIncome}</h2>
          <p>Total Income</p>
        </div>
        <div className="bg-gray-200 p-5 rounded-lg">
          <h2 className="text-xl font-bold">BDT {totalExpense}</h2>
          <p>Total Expense</p>
        </div>
      </div>
    </>
  );
};

export default BalanceSummary;
