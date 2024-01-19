import React, { useState, useEffect, useContext } from "react";
import { CloseIcon } from "../icons/icons";
import updateProjectList from "../utils/UpdateProjectList";
import AuthContext from "../context/AuthContext";

const ProjectForm = ({ onCloseProjectClick, setProjects, project }) => {
  const { authTokens } = useContext(AuthContext);
  const [projectFormData, setProjectFormData] = useState({ title: project.title, tasks: [{ ...project.tasks }] });

  const URL = "http://127.0.0.1:8000/api/";
  // Submit Project
  const handleSubmitProject = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(projectFormData));

    try {
      const response = await fetch(`${URL}projects/${project.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens.access,
        },
        body: JSON.stringify(projectFormData),
      });

      if (response.ok) {
        console.log("Project updated successfully");
        updateProjectList(setProjects, authTokens);
        onCloseProjectClick();
        setProjectFormData({
          title: "",
        });
      } else {
        console.log("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project: ", error);
    }
  };

  return (
    <div className="project-modal-overlay" onClick={(e) => e.stopPropagation()}>
      <div className="project-modal">
        <form onSubmit={handleSubmitProject}>
          <div className="project-close">
            <CloseIcon onClick={onCloseProjectClick} />
          </div>

          {/* title */}
          <div className="mb-3">
            <label className="form-label"> Title</label>
            <input type="text" className="form-control" name="title" value={projectFormData.title} onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })} required />
          </div>

          {/* submit  */}
          <div>
            <button type="submit" className="btn btn-primary mr-" onSubmit={handleSubmitProject}>
              Update
            </button>
            <button type="submit" className="btn btn-secondary" onClick={onCloseProjectClick}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
