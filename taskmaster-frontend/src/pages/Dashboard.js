import React from "react";
import { Box, Typography } from "@mui/material";
import TaskList from "../components/TaskList";
import ProductivityChart from "../components/ProductivityChart";

const Dashboard = () => {
  return (
    <Box display="flex" height="100vh">
      {/* Metade Esquerda da Tela */}
      <Box width="50%" padding={2} overflow="auto">
        <Typography variant="h4" gutterBottom>
          Task Management
        </Typography>
        <TaskList />
      </Box>

      {/* Metade Direita da Tela - Dashboard Fixo */}
      <Box
        width="50%"
        position="fixed"
        right={0}
        top={0}
        height="100vh"
        padding={2}
        bgcolor="#f5f5f5"
        boxShadow={2}
      >
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <ProductivityChart />
      </Box>
    </Box>
  );
};

export default Dashboard;
