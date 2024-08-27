import React, { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../services/taskService";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    console.log("Deleting task with id:", id);
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      if (!taskToUpdate) {
        console.error("Task not found with ID:", id);
        return;
      }

      const updatedTask = { ...taskToUpdate, status: newStatus };

      await updateTask(id, updatedTask);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
      fetchTasks();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <li key={task.id}>
          {task.title}
          <button onClick={() => handleDelete(task.ID)}>Delete</button>
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(task.id, e.target.value)}
          >
            <option value="Aberto">Aberto</option>
            <option value="Pendente">Pendente</option>
            <option value="Completo">Completo</option>
          </select>
        </li>
      ));
  };

  return (
    <div>
      <TaskForm setTasks={setTasks} tasks={tasks} />
      <div>
        <h2>Aberto</h2>
        <ul>{renderTasks("Aberto")}</ul>
      </div>
      <div>
        <h2>Pendente</h2>
        <ul>{renderTasks("Pendente")}</ul>
      </div>
      <div>
        <h2>Completo</h2>
        <ul>{renderTasks("Completo")}</ul>
      </div>
    </div>
  );
};

export default TaskList;
