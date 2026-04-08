import React, { createContext, useContext, useState, useEffect } from 'react';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_transactions');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
      date: transaction.date || new Date().toISOString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Calculate totals
  const totals = transactions.reduce((acc, t) => {
    if (t.type === 'income') {
      acc.income += parseFloat(t.amount);
      acc.balance += parseFloat(t.amount);
    } else {
      acc.expense += parseFloat(t.amount);
      acc.balance -= parseFloat(t.amount);
    }
    return acc;
  }, { income: 0, expense: 0, balance: 0 });

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        filterCategory,
        setFilterCategory,
        totals
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
