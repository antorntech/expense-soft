import React, { useState } from "react";

// Header Component
const Header = () => {
  return (
    <div className="flex items-center justify-between bg-gray-200 px-5 py-3 rounded-md">
      <div>
        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white text-2xl font-bold">L</span>
        </div>
      </div>
      <div>
        <ul className="flex items-center gap-5">
          <li>HOME</li>
          <li>APP</li>
          <li>ACCOUNT</li>
          <li>EXPORT</li>
        </ul>
      </div>
      <div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md">
          Get App
        </button>
      </div>
    </div>
  );
};

// Expense Tracker Form Component
const ExpenseTrackerForm = ({ addTransaction }) => {
  const [isExpense, setIsExpense] = useState(true);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const expenseCategories = ["Education", "Food", "Transport", "Shopping"];
  const incomeCategories = ["Salary", "Business", "Investments", "Gifts"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      type: isExpense ? "Expense" : "Income",
      category,
      amount: parseFloat(amount),
      date,
    };

    addTransaction(transaction);

    // Reset form
    setCategory("");
    setAmount("");
    setDate("");
  };

  return (
    <div className="max-w-md mx-auto p-4 border bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">Expense Tracker</h1>

      {/* Expense/Income Toggle */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setIsExpense(true)}
          className={`px-4 py-2 rounded-md ${
            isExpense ? "bg-teal-500 text-white" : "bg-gray-200"
          }`}
        >
          Expense
        </button>
        <button
          onClick={() => setIsExpense(false)}
          className={`px-4 py-2 rounded-md ${
            !isExpense ? "bg-teal-500 text-white" : "bg-gray-200"
          }`}
        >
          Income
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">Select Category</option>
            {isExpense
              ? expenseCategories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))
              : incomeCategories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 text-white p-2 rounded-md"
        >
          Save
        </button>
      </form>
    </div>
  );
};

// Main Application Component
function App() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="p-5">
      <div className="max-w-screen-xl mx-auto">
        <Header />

        {/* Summary Section */}
        <div className="grid grid-cols-3 gap-5 py-5 text-center">
          <div className="bg-gray-100 p-5 rounded-lg">
            <h2 className="text-xl font-bold">BDT {balance}</h2>
            <p>Balance</p>
          </div>
          <div className="bg-gray-100 p-5 rounded-lg">
            <h2 className="text-xl font-bold">BDT {totalIncome}</h2>
            <p>Total Income</p>
          </div>
          <div className="bg-gray-100 p-5 rounded-lg">
            <h2 className="text-xl font-bold">BDT {totalExpense}</h2>
            <p>Total Expense</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-5 py-5">
          <div className="col-span-1">
            <ExpenseTrackerForm addTransaction={addTransaction} />
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-5">
              {/* Income Section */}
              <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold flex justify-between">
                  <span>Income</span>
                </h2>
                <ul className="mt-4">
                  {transactions
                    .filter((t) => t.type === "Income")
                    .map((transaction, index) => (
                      <li
                        key={index}
                        className="flex justify-between border-b py-2"
                      >
                        <span>{transaction.category}</span>
                        <span>BDT {transaction.amount}</span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Expense Section */}
              <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold flex justify-between">
                  <span>Expense</span>
                </h2>
                <ul className="mt-4">
                  {transactions
                    .filter((t) => t.type === "Expense")
                    .map((transaction, index) => (
                      <li
                        key={index}
                        className="flex justify-between border-b py-2"
                      >
                        <span>{transaction.category}</span>
                        <span>BDT {transaction.amount}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
