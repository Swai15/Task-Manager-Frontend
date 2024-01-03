import React, { useState, useEffect } from "react";
import Task from "./components/Task";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const URL = "http://127.0.0.1:8000/api";

  const fetchTasks = async () => {
    try {
      const response = await fetch(URL + "/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <h2>Tasks</h2>
      <hr />
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}

export default App;
