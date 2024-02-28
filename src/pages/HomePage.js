import React, { useState, useEffect, useContext } from "react";
import Task from "../components/Task";
import Project from "../components/Projects";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { AddProjectIcon, AddTaskIcon, ArrowLeftIcon, CloseIcon } from "../icons/icons";
import OrganizeTasksByDate from "../utils/OrganizeTasksByDate";
import TaskForm from "../components/TaskForm";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import AuthContext from "../context/AuthContext";

function HomePage() {
  const { authTokens, logoutUser } = useContext(AuthContext);
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
      const response = await fetch(URL + "/projects/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      if (response.ok) {
        let data = await response.json();
        setProjects(data);
      } else if (response.statusText === "Unauthorized") {
        logoutUser();
      } else {
        console.error("Error fetching projects: ", response.status);
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  // fetch all projects
  // const fetchProjects = async () => {
  //   try {
  //     const response = await fetch(URL + "/projects/");
  //     const data = await response.json();
  //     setProjects(data);
  //   } catch (error) {
  //     console.error("Error fetching projects: ", error);
  //   }
  // };

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
    <div className="HomeProjects-container">
      {/* Project List */}
      {projectsVisible ? (
        // <ProjectList project={project} setProjects={setProjects} hand />

        <div className="project-container-parent">
          <Header />
          <ProjectList projects={projects} setProjects={setProjects} handleActiveProject={handleActiveProject} />

          {/* Add project modal */}
          <div className="project-add">
            <AddProjectIcon onClick={handleAddProjectClick} />
          </div>
          {projectModal && <ProjectForm onCloseProjectClick={handleCloseProjectClick} setProjects={setProjects} />}
        </div>
      ) : null}

      {/* Task List */}
      {selectedProject && (
        <TaskList
          todayTasks={todayTasks}
          tomorrowTasks={tomorrowTasks}
          futureTasks={futureTasks}
          overdueTasks={overdueTasks}
          setProjects={setProjects}
          projects={projects}
          onCloseTaskClick={handleCloseTaskClick}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          activeProjectId={activeProjectId}
          handleBackToProjects={handleBackToProjects}
          handleAddTaskClick={handleAddTaskClick}
          taskModal={taskModal}
          handleCloseTaskClick={handleCloseTaskClick}
        />
      )}
      {/* End of displayed tasks */}
    </div>
  );
}

export default HomePage;
