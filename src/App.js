import React, { useState, useEffect } from "react";
import Task from "./components/Task";
import Project from "./components/Projects";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AddTaskIcon, ArrowLeftIcon, CloseIcon } from "./icons/icons";
import OrganizeTasksByDate from "./utils/OrganizeTasksByDate";
import TaskForm from "./components/TaskForm";

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsVisible, setProjectsVisible] = useState(true);
  const [taskModal, setTaskModal] = useState(false);

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

  // Organize tasks by date
  const OrganizeTasks = () => {
    if (!selectedProject || !selectedProject.tasks) {
      return {
        todayTasks: [],
        tomorrowTasks: [],
        futureTasks: [],
        overdueTasks: [],
      };
    }

    return OrganizeTasksByDate(selectedProject.tasks);
  };
  const { todayTasks, tomorrowTasks, futureTasks, overdueTasks } = OrganizeTasks();

  // Handle Add task
  const handleAddTaskClick = () => {
    setTaskModal(true);
  };

  const handleCloseTaskClick = () => {
    setTaskModal(false);
  };

  // Return JSX

  return (
    <div>
      {/* Project List */}
      {projectsVisible ? (
        <div>
          <h2>Projects</h2>
          <hr />
          <div>
            {projects.map((project) => (
              <div key={project.id}>
                <Project project={project} onClick={() => handleActiveProject(project)} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Tasks */}
      {selectedProject && (
        <div className="selected-project-tasks">
          <div className="back-button">
            <ArrowLeftIcon onClick={handleBackToProjects} />
          </div>
          <h3>Tasks for {selectedProject.title}</h3>
          <hr />
          {/* Todays Tasks */}
          {todayTasks.length > 0 && (
            <>
              <h4 className="task-topic">Today </h4>
              <div>
                {todayTasks.map((task) => (
                  <div key={task.id} className="col-md-4 mb-3">
                    <Task task={task} />
                  </div>
                ))}
              </div>
            </>
          )}
          <hr />
          {/* Tomorrow's tasks */}
          {tomorrowTasks.length > 0 && (
            <>
              <h4 className="task-topic">Tomorrow</h4>
              <div>
                {tomorrowTasks.map((task) => (
                  <div key={task.id} className="col-md-4 mb-3">
                    <Task task={task} />
                  </div>
                ))}
              </div>
            </>
          )}
          <hr />
          {/* Future tasks */}
          {futureTasks.length > 0 && (
            <>
              <h4 className="task-topic">Future </h4>
              <div>
                {futureTasks.map((task) => (
                  <div key={task.id} className="col-md-4 mb-3">
                    <Task task={task} />
                  </div>
                ))}
              </div>
            </>
          )}
          <hr />
          {/* Overdue tasks */}
          {overdueTasks.length > 0 && (
            <>
              <h4 className="task-topic">Overdue Heading</h4>
              <div className="row">
                {overdueTasks.map((task) => (
                  <div key={task.id} className="col-mb-14mb-3">
                    <Task task={task} />
                  </div>
                ))}
              </div>
            </>
          )}
          <hr />

          {/* open add */}
          <div className="task-add">
            <AddTaskIcon onClick={handleAddTaskClick} />
          </div>
          {/* add task modal */}
          {taskModal && <TaskForm onCloseTaskClick={handleCloseTaskClick} />}
        </div>
      )}
      {/* End of displayed tasks */}
    </div>
  );
}

export default App;
