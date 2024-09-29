/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"; // Ensure this is a client-side component

import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Todo = {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  duedate: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]); // Type definition for the Todo list
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState({ name: "", description: "", duedate: "" ,status: "false"});

  // Fetch all todos from the backend
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch("/api/v1/todo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await res.json();
      setTodos(data.data); // Assuming the data structure contains `data`
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Error fetching todos");
      setLoading(false);
    }
  };


  // Function to create a new task
  const createTodo = async () => {
    try {
      await fetch("/api/v1/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      setNewTodo({ name: "", description: "", duedate: "" ,status: ""});
      fetchTodos(); // Refresh list after adding new todo
    } catch (err) {
      console.error(err);
      setError("Error creating new todo");
    }
  };

  // Function to update the status of a task (toggle done/undone)
  const handleStatusUpdate = async (todoId: string, newStatus: boolean) => {
    try {
      const res = await fetch(`/api/v1/todo/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update todo status");
      }

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === todoId ? { ...todo, status: newStatus } : todo
        )
      );
    } catch (err) {
      console.error(err);
      setError("Error updating status");
    }
  };

  // Function to delete a todo
  const handleDeleteTodo = async (todoId: string) => {
    try {
      const res = await fetch(`/api/v1/todo/${todoId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
    } catch (err) {
      console.error(err);
      setError("Error deleting todo");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.page}>
      <h1 className={styles.headers}>TODO List</h1>
      
      {/* Create new TODO form */}
      <div className={styles.InputTodo}>
        <input
          type="text"
          placeholder="Task Name"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <input
          type="date"
          placeholder="Due Date"
          value={newTodo.duedate}
          onChange={(e) => setNewTodo({ ...newTodo, duedate: e.target.value })}
        />
        <button onClick={createTodo}>Add Task</button>
      </div>

      {/* Display TODOs */}
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className={styles.todoItem}>
            <div>
              <span
                style={{
                  textDecoration: todo.status ? "line-through" : "none",
                }}
              >
                {todo.name} - {todo.description}
              </span>
              <p>Due: {todo.duedate}</p>
            </div>
            <button
              onClick={() => handleStatusUpdate(todo._id, !todo.status)}
              className={todo.status ? styles.completed : ""}
            >
              {todo.status ? "Mark as Undone" : "Mark as Done"}
            </button>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
