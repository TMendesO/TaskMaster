import React, { useState } from "react";
import { createTask } from "../services/taskService";
import { TextField, Button, Box } from "@mui/material";

const TaskForm = ({ setTasks, tasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, status: "Aberto" };
    const response = await createTask(newTask);
    setTasks([...tasks, response.data]);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          fullWidth
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Add Task
        </Button>
      </Box>
    </form>
  );
};

export default TaskForm;
