import React from "react";
import TaskList from "../components/TaskList";
import ProductivityChart from "../components/ProductivityChart";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <ProductivityChart />
      <TaskList />
    </div>
  );
};

export default Dashboard;
