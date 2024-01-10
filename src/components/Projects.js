import React, { useState } from "react";
import { Card, Badge } from "react-bootstrap"; // Import Card and Badge from react-bootstrap
import { DeleteIcon, EditIcon } from "../icons/icons";
import EditProjectForm from "./EditProjectForm";

const Project = ({ project, onClick, setProjects, propUpdateProjects }) => {
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
      console.log("PROJECT edited list updated");
      const response = await fetch(URL + "projects/");
      const updatedData = await response.json();
      setProjects(updatedData);
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
      const response = await fetch(`${URL}projects/${project.id}`, { method: "DELETE" });

      if (response.ok) {
        console.log("Project Deleted");
        updateProjectList();
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
          <p className="project-card-icon">📂</p>
          <h4>{project.title}</h4>
          <p>{project.tasks.length} Tasks</p>

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
                    Deleting this project will clear <strong>{totalTasks} totalTasks</strong>
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
