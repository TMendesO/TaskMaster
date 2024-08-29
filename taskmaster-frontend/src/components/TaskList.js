import React, { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../services/taskService";
import TaskForm from "./TaskForm";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const taskToUpdate = tasks.find((task) => task.ID === taskId);
      if (!taskToUpdate) {
        console.error("Task not found with ID:", taskId);
        return;
      }

      const updatedTask = { ...taskToUpdate, status: newStatus };
      await updateTask(taskId, updatedTask);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.ID === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const task = tasks.find((task) => task.ID.toString() === draggableId);

    if (task && task.status !== destination.droppableId) {
      handleStatusChange(task.ID, destination.droppableId);
    }
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task, index) => {
        if (!task.ID) {
          console.error("Task ID is undefined for task:", task);
          return null; // Skip rendering this task
        }

        return (
          <Draggable
            key={task.ID}
            draggableId={task.ID.toString()}
            index={index}
          >
            {(provided) => (
              <Card
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                sx={{
                  marginBottom: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                  padding: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {task.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(task.ID)}
                    fullWidth
                    sx={{ marginTop: 2 }}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            )}
          </Draggable>
        );
      });
  };

  return (
    <Box>
      <TaskForm setTasks={setTasks} tasks={tasks} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          {["Aberto", "Pendente", "Completo"].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{ flex: 1, marginX: 2 }}
                >
                  <Typography variant="h5" gutterBottom>
                    {status}
                  </Typography>
                  {renderTasks(status)}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default TaskList;
