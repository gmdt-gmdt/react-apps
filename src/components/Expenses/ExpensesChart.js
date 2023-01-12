import React from "react";
import { CHART_DATA_POINTS } from "../../constants";

import Chart from "../Chart/Chart";

const ExpensesChart = (props) => {
  for (const expense of props.expenses) {
    const expenseMonth = expense.date.getMonth(); // (January gives 0)
    CHART_DATA_POINTS[expenseMonth].value += expense.amount;
  }

  return <Chart dataPoints={CHART_DATA_POINTS} />;
};

export default ExpensesChart;
