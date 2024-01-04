import React, { useState, useEffect } from "react";
import Task from "./components/Task";
import Project from "./components/Projects";

import "./App.css";

function App() {
  // const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const URL = "http://127.0.0.1:8000/api";

  const fetchProjects = async () => {
    try {
      const response = await fetch(URL + "/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="App">
      <h2>Projects</h2>
      {projects.map((project) => (
        <div key={project.id}>
          <Project project={project} />
          <h3>Tasks</h3>
          {project.tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
