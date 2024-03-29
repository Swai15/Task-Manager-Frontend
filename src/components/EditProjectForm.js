import React, { useState, useEffect, useContext } from "react";
import { CloseIcon } from "../icons/icons";
import updateProjectList from "../utils/UpdateProjectList";
import AuthContext from "../context/AuthContext";
import { DefaultListIcon, HealthIcon, HomeIcon, JobIcon, SavingsIcon, SocialIcon } from "../icons/projectsIcons";

const ProjectForm = ({ onCloseProjectClick, setProjects, project }) => {
  const { authTokens } = useContext(AuthContext);
  const [projectFormData, setProjectFormData] = useState({ title: project.title, icon: project.icon, tasks: [{ ...project.tasks }] });
  const [selectedIcon, setSelectedIcon] = useState(project.icon);
  const [editProjectLoading, setEditProjectLoading] = useState(false);

  const URL = "https://jules.pythonanywhere.com/api/";

  // Submit Project
  const handleSubmitProject = async (e) => {
    e.preventDefault();
    setEditProjectLoading(true);
    // console.log(JSON.stringify(projectFormData));

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
        setEditProjectLoading(false);
        onCloseProjectClick();
      } else {
        console.log("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project: ", error);
    }
  };

  // Icons Map
  const iconMap = {
    default: <DefaultListIcon />,
    home: <HomeIcon />,
    work: <JobIcon />,
    health: <HealthIcon />,
    savings: <SavingsIcon />,
    social: <SocialIcon />,
  };

  const iconKeys = ["default", "home", "work", "health", "savings", "social"];

  const getIcon = (icon) => {
    return iconMap[icon] || iconMap["default"];
  };

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    setProjectFormData((prevFormData) => ({
      ...prevFormData,
      icon: icon,
    }));
  };

  return (
    <div className="project-modal-overlay" onClick={(e) => e.stopPropagation()}>
      <div className="project-modal">
        <form onSubmit={handleSubmitProject}>
          <div className=" mb-3 add-project-header modal-header">
            <h3>Edit Project</h3>
            <div className="project-close">
              <CloseIcon onClick={onCloseProjectClick} />
            </div>
          </div>

          {/* icon selection */}
          <div className="mb-3">
            <label className="form-label">Icon</label>
            <div className="d-flex justify-content-between">
              {iconKeys.map((icon) => (
                <div key={icon} className={`project-icon ${selectedIcon === icon ? "selected" : ""}`} onClick={() => handleIconClick(icon)}>
                  {getIcon(icon)}
                </div>
              ))}
            </div>
          </div>

          {/* title */}
          <div className="mb-3">
            <label className="form-label">
              {" "}
              Title <span className="text-danger">*</span>
            </label>
            <input type="text" className="form-control" name="title" value={projectFormData.title} onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })} required />
          </div>

          {/* submit/cancel */}
          <div className="project-modal-buttons">
            <button type="submit" className="btn btn-primary mr-" onSubmit={handleSubmitProject}>
              {editProjectLoading ? <img className="register-loading" src="/Images/loading.gif" alt="" /> : "Update"}
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
