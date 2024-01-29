import React, { useState, useContext } from "react";
import { Card, Badge } from "react-bootstrap"; // Import Card and Badge from react-bootstrap
import { DeleteIcon, EditIcon } from "../icons/icons";
import EditProjectForm from "./EditProjectForm";
import AuthContext from "../context/AuthContext";

const Project = ({ project, onClick, setProjects, propUpdateProjects }) => {
  let { authTokens } = useContext(AuthContext);
  const [editProjectModal, setEditProjectModal] = useState(false);
  const [deleteProjectModal, setDeleteProjectModal] = useState(false);

  const URL = "http://127.0.0.1:8000/api/";

  // Edit Project
  const handleEditProjectClick = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setEditProjectModal(true);
    console.log("Active Project ID: ", project.id);
  };

  const closeEditProjectClick = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setEditProjectModal(false);
  };

  // Update project list
  const updateProjectList = async () => {
    try {
      console.log("project edited list updated");
      const response = await fetch(URL + "projects/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      const updatedData = await response.json();
      // setProjects(updatedData);
      if (Array.isArray(updatedData)) {
        setProjects(updatedData);
      } else {
        console.error("Invalid projects data:", updatedData);
        // Handle the case where the response is not an array
      }
    } catch (error) {
      console.error("Error fetching updated projects ", error);
    }
  };

  // deleteProject
  const handleDeleteProjectCLick = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setDeleteProjectModal(true);
  };

  const closeDeleteProjectClick = (e) => {
    setDeleteProjectModal(false);
  };

  const handleDeleteProjectConfirmation = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}projects/${project.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });

      if (response.ok) {
        console.log("Project Deleted");
        updateProjectList();
        // updateProjectList(setProjects, authTokens);
        setDeleteProjectModal(false);
      } else {
        console.log("Failed to delete Task");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // Progress bar
  const completedTasks = project.tasks.filter((task) => task.completed).length;
  const totalTasks = project.tasks.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="project-card-container" key={project.id} onClick={() => onClick(project)}>
      <div className="project-card cursor">
        <div className="project-card-contents">
          <p className="project-card-icon">{project.icon}</p>
          <h4>{project.title}</h4>
          <p>
            {project.tasks.length} {project.tasks.length != 1 ? "Tasks" : "Task"}
          </p>

          {/* Progress bar */}
          <div className="progress" style={{ height: "4px", marginBottom: "10px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${completionPercentage}%`, borderRadius: "0", height: "100%", backgroundColor: "#007BFF" }}
              aria-valuenow={completionPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

          <div
            className="project-card-modify-icons
          "
          >
            <EditIcon onClick={handleEditProjectClick} />
            {editProjectModal && <EditProjectForm setProjects={setProjects} onCloseProjectClick={closeEditProjectClick} project={project} />}

            <DeleteIcon onClick={handleDeleteProjectCLick} />

            {deleteProjectModal && (
              <div className="delete-project-modal-overlay" onClick={(e) => e.stopPropagation()}>
                <div className="delete-project-modal">
                  <p>
                    Deleting this project will clear
                    {project.tasks.length != 1 ? <strong> {totalTasks} tasks</strong> : <strong> {totalTasks} task</strong>}
                  </p>
                  <p>Are you sure you want to proceed?</p>
                  <div className="delete-project-modal-icons">
                    <button type="button" className="btn btn-primary " onClick={handleDeleteProjectConfirmation}>
                      Delete
                    </button>

                    <button type="submit" className="btn btn-secondary" onClick={closeDeleteProjectClick}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
