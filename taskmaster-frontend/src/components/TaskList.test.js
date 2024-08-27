import React from "react";
import { render, screen } from "@testing-library/react";
import TaskList from "./TaskList";
import "@testing-library/jest-dom";

test("renders TaskList component", () => {
  render(<TaskList />);
  expect(screen.getByText(/Add Task/i)).toBeInTheDocument();
});
