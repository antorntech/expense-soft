import React, { useState, useEffect } from "react";

// Header Component
const Header = () => (
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
    <button className="bg-green-600 text-white px-4 py-2 rounded-md">
      Get App
    </button>
  </div>
);

// Expense Tracker Form Component
const ExpenseTrackerForm = ({
  addTransaction,
  isEditing,
  transactionToEdit,
  updateTransaction,
}) => {
  const [isExpense, setIsExpense] = useState(true);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const expenseCategories = ["Education", "Food", "Transport", "Shopping"];
  const incomeCategories = ["Salary", "Business", "Investments", "Gifts"];

  // UseEffect to populate the form with values when editing
  useEffect(() => {
    if (isEditing && transactionToEdit) {
      setIsExpense(transactionToEdit.type === "Expense");
      setCategory(transactionToEdit.category);
      setAmount(transactionToEdit.amount);
      setDate(transactionToEdit.date);
    }
  }, [isEditing, transactionToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      id: isEditing ? transactionToEdit.id : Date.now(),
      type: isExpense ? "Expense" : "Income",
      category,
      amount: parseFloat(amount),
      date,
    };

    if (isEditing) {
      updateTransaction(transaction);
    } else {
      addTransaction(transaction);
    }

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
            {(isExpense ? expenseCategories : incomeCategories).map(
              (cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              )
            )}
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
          {isEditing ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

// Main Application Component
function App() {
  const [transactions, setTransactions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [selectedIncomeCategories, setSelectedIncomeCategories] = useState([]);
  const [selectedExpenseCategories, setSelectedExpenseCategories] = useState(
    []
  );
  const [sortOrder, setSortOrder] = useState(""); // New state for sorting

  const expenseCategories = ["Education", "Food", "Transport", "Shopping"];
  const incomeCategories = ["Salary", "Business", "Investments", "Gifts"];

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const editTransaction = (transaction) => {
    setIsEditing(true);
    setTransactionToEdit(transaction);
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );
    setIsEditing(false);
    setTransactionToEdit(null);
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const handleCategoryChange = (category, type) => {
    if (type === "income") {
      setSelectedIncomeCategories((prev) =>
        prev.includes(category)
          ? prev.filter((cat) => cat !== category)
          : [...prev, category]
      );
    } else {
      setSelectedExpenseCategories((prev) =>
        prev.includes(category)
          ? prev.filter((cat) => cat !== category)
          : [...prev, category]
      );
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortTransactions = (transactionsList) => {
    if (sortOrder === "low-to-high") {
      return transactionsList.sort((a, b) => a.amount - b.amount);
    } else if (sortOrder === "high-to-low") {
      return transactionsList.sort((a, b) => b.amount - a.amount);
    }
    return transactionsList;
  };

  const filteredIncomeTransactions = sortTransactions(
    transactions.filter(
      (t) =>
        t.type === "Income" &&
        (selectedIncomeCategories.length === 0 ||
          selectedIncomeCategories.includes(t.category))
    )
  );

  const filteredExpenseTransactions = sortTransactions(
    transactions.filter(
      (t) =>
        t.type === "Expense" &&
        (selectedExpenseCategories.length === 0 ||
          selectedExpenseCategories.includes(t.category))
    )
  );

  const totalIncome = filteredIncomeTransactions.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const totalExpense = filteredExpenseTransactions.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
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
            <ExpenseTrackerForm
              addTransaction={addTransaction}
              isEditing={isEditing}
              transactionToEdit={transactionToEdit}
              updateTransaction={updateTransaction}
            />
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-5">
              {/* Income Section */}
              <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold">Income</h2>

                {/* Income Filter */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Filter by Category:</h4>
                  {incomeCategories.map((category, idx) => (
                    <label key={idx} className="mr-2">
                      <input
                        type="checkbox"
                        value={category}
                        checked={selectedIncomeCategories.includes(category)}
                        onChange={() =>
                          handleCategoryChange(category, "income")
                        }
                        className="mr-1"
                      />
                      {category}
                    </label>
                  ))}
                </div>

                {/* Sorting Dropdown */}
                <div className="mb-4">
                  <label className="font-medium mr-2">Sort by Amount:</label>
                  <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="border p-2 rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="low-to-high">Low to High</option>
                    <option value="high-to-low">High to Low</option>
                  </select>
                </div>

                {/* Income Table */}
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Category</th>
                      <th className="border px-4 py-2">Amount</th>
                      <th className="border px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIncomeTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border">
                        <td className="border px-4 py-2">
                          {transaction.category}
                        </td>
                        <td className="border px-4 py-2">
                          BDT {transaction.amount}
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                            onClick={() => editTransaction(transaction)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded"
                            onClick={() => deleteTransaction(transaction.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Expense Section */}
              <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold">Expense</h2>

                {/* Expense Filter */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Filter by Category:</h4>
                  {expenseCategories.map((category, idx) => (
                    <label key={idx} className="mr-2">
                      <input
                        type="checkbox"
                        value={category}
                        checked={selectedExpenseCategories.includes(category)}
                        onChange={() =>
                          handleCategoryChange(category, "expense")
                        }
                        className="mr-1"
                      />
                      {category}
                    </label>
                  ))}
                </div>

                {/* Sorting Dropdown */}
                <div className="mb-4">
                  <label className="font-medium mr-2">Sort by Amount:</label>
                  <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="border p-2 rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="low-to-high">Low to High</option>
                    <option value="high-to-low">High to Low</option>
                  </select>
                </div>

                {/* Expense Table */}
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Category</th>
                      <th className="border px-4 py-2">Amount</th>
                      <th className="border px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenseTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border">
                        <td className="border px-4 py-2">
                          {transaction.category}
                        </td>
                        <td className="border px-4 py-2">
                          BDT {transaction.amount}
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                            onClick={() => editTransaction(transaction)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded"
                            onClick={() => deleteTransaction(transaction.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
