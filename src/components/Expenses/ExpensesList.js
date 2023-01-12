import React from "react";

import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = ({ items }) => {
  return !items.length ? (
    <h2 className="expenses-list__fallback">Found no expenses.</h2>
  ) : (
    <ul className="expenses-list">
      {items.map(({ id, title, amount, date }) => (
        <ExpenseItem key={id} title={title} amount={amount} date={date} />
      ))}
    </ul>
  );
};

export default ExpensesList;
