import React, { useState, useEffect } from "react";
import Task from "./components/Task";
import Project from "./components/Projects";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ArrowLeftIcon } from "./icons/icons";

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsVisible, setProjectsVisible] = useState(true);

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

  const handleActiveProject = (project) => {
    console.log("Project clicked");
    setSelectedProject(project);
    setProjectsVisible(false);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setProjectsVisible(true);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="App container">
      {projectsVisible ? (
        <div>
          <h2>Projects</h2>
          <hr />
          <div className="row">
            {projects.map((project) => (
              <div key={project.id} className="col-md-4 mb-3 project">
                <Project project={project} onClick={() => handleActiveProject(project)} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Clicked projects */}
      {selectedProject && (
        <div>
          <div className="back-button">
            <ArrowLeftIcon onClick={handleBackToProjects} />
          </div>
          <h3>Tasks for {selectedProject.title}</h3>
          <div className="row">
            {selectedProject.tasks.map((task) => (
              <div key={task.id} className="col-md-4 mb-3">
                <Task task={task} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
