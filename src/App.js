import React, { useState, useEffect } from "react";
import Task from "./components/Task";
import Project from "./components/Projects";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AddProjectIcon, AddTaskIcon, ArrowLeftIcon, CloseIcon } from "./icons/icons";
import OrganizeTasksByDate from "./utils/OrganizeTasksByDate";
import TaskForm from "./components/TaskForm";
import ProjectForm from "./components/ProjectForm";

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsVisible, setProjectsVisible] = useState(true);
  const [taskModal, setTaskModal] = useState(false);
  const [projectModal, setProjectModal] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(null);

  const URL = "http://127.0.0.1:8000/api";

  // fetch all projects
  const fetchProjects = async () => {
    try {
      const response = await fetch(URL + "/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  // display tasks for projects clicked
  const handleActiveProject = (project) => {
    setSelectedProject(project);
    setActiveProjectId(project.id);
    setProjectsVisible(false);
  };

  // back button
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

  // Handle Add task/project
  const handleAddTaskClick = () => {
    setTaskModal(true);
  };

  const handleCloseTaskClick = () => {
    setTaskModal(false);
  };

  const handleAddProjectClick = () => {
    setProjectModal(true);
  };

  const handleCloseProjectClick = () => {
    setProjectModal(false);
  };

  // Return
  <hr />;
  return (
    <div>
      {/* Project List */}
      {projectsVisible ? (
        <div className="project-container-parent">
          <h2>Task Manager</h2>
          <hr />
          <div className="project-container">
            <div>
              {projects.map((project) => (
                <div key={project.id}>
                  <Project project={project} setProjects={setProjects} onClick={() => handleActiveProject(project)} />
                </div>
              ))}
            </div>
          </div>

          {/* Add project modal */}
          <div className="project-add">
            <AddProjectIcon onClick={handleAddProjectClick} />
          </div>

          {projectModal && <ProjectForm onCloseProjectClick={handleCloseProjectClick} setProjects={setProjects} />}
        </div>
      ) : null}

      {/* Task List */}
      {selectedProject && (
        <div className="selected-project-tasks">
          <div className="back-button">
            <ArrowLeftIcon onClick={handleBackToProjects} />
          </div>
          {/* Work on project icons */}
          <div className="task-header">
            <h3 className="task-title-header">📂 {selectedProject.title}</h3>
          </div>
          {/* Add task */}
          <div className="task-add">
            <AddTaskIcon onClick={handleAddTaskClick} />
          </div>
          {/* Todays Tasks */}
          {todayTasks.length > 0 && (
            <>
              <h4 className="task-topic">Today </h4>
              <div>
                {todayTasks.map((task) => (
                  <div key={task.id} className="col-md-4 mb-3">
                    <Task task={task} projects={projects} onCloseTaskClick={handleCloseTaskClick} setSelectedProject={setSelectedProject} activeProjectId={activeProjectId} />
                  </div>
                ))}
              </div>
              <hr />
            </>
          )}

          {/* Tomorrow's tasks */}
          {tomorrowTasks.length > 0 && (
            <>
              <h4 className="task-topic">Tomorrow</h4>
              <div>
                {tomorrowTasks.map((task) => (
                  <div key={task.id} className="col-md-4 mb-3">
                    <Task task={task} projects={projects} onCloseTaskClick={handleCloseTaskClick} setSelectedProject={setSelectedProject} activeProjectId={activeProjectId} />
                  </div>
                ))}
              </div>
              <hr />
            </>
          )}

          {/* Future tasks */}
          {futureTasks.length > 0 && (
            <>
              <h4 className="task-topic">Future </h4>
              <div>
                {futureTasks.map((task) => (
                  <div key={task.id} className="col-md-4 mb-3">
                    <Task task={task} projects={projects} onCloseTaskClick={handleCloseTaskClick} setSelectedProject={setSelectedProject} activeProjectId={activeProjectId} />
                  </div>
                ))}
              </div>
              <hr />
            </>
          )}

          {/* Overdue tasks */}
          {overdueTasks.length > 0 && (
            <>
              <h4 className="task-topic">Overdue Heading</h4>
              <div className="row">
                {overdueTasks.map((task) => (
                  <div key={task.id} className="col-mb-14mb-3">
                    <Task task={task} onCloseTaskClick={handleCloseTaskClick} projects={projects} setProjects={setProjects} setSelectedProject={setSelectedProject} activeProjectId={activeProjectId} />
                  </div>
                ))}
              </div>
              <hr />
            </>
          )}

          {/* open add task form */}
          {/* <div className="task-add">
            <AddTaskIcon onClick={handleAddTaskClick} />
          </div> */}

          {/* Add & submit task */}
          {taskModal && <TaskForm onCloseTaskClick={handleCloseTaskClick} setSelectedProject={setSelectedProject} activeProjectId={activeProjectId} />}
        </div>
      )}
      {/* End of displayed tasks */}
    </div>
  );
}

export default App;
