import React from "react";
import { YEAR_FILTERS } from "../../constants";

import "./ExpensesFilter.css";

const ExpensesFilter = ({ onChangeFilter, selected }) => {
  const dropdownChangeHandler = (event) => onChangeFilter(event.target.value);

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select value={selected} onChange={dropdownChangeHandler}>
          {YEAR_FILTERS.map((year, i) => (
            <option key={i} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
