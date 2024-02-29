import React, { useContext, useState } from "react";
import { CloseIcon } from "../icons/icons";
import AuthContext from "../context/AuthContext";
import updateProjectList from "../utils/UpdateProjectList";

import { DefaultListIcon, HomeIcon, JobIcon, HealthIcon, SavingsIcon, SocialIcon } from "../icons/projectsIcons";

const ProjectForm = ({ onCloseProjectClick, setProjects }) => {
  let { authTokens } = useContext(AuthContext);
  const [projectFormData, setProjectFormData] = useState({ title: "", icon: "default" });
  const [selectedIcon, setSelectedIcon] = useState("default");

  const URL = "http://127.0.0.1:8000/api/";

  // Submit Project
  const handleSubmitProject = async (e) => {
    e.preventDefault();

    const URL = "http://127.0.0.1:8000/api/";

    try {
      console.log(JSON.stringify(projectFormData));

      const response = await fetch(URL + "projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify(projectFormData),
      });

      if (response.ok) {
        console.log("project submitted");
        // updateProjectList();
        updateProjectList(setProjects, authTokens);
        onCloseProjectClick();
        setProjectFormData({
          title: "",
          icon: "default",
        });
      } else {
        console.log("Failed to submit project");
      }
    } catch (error) {
      console.error("Error fetching projects: ", error);
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
    <div className="project-modal-overlay">
      <div className="project-modal">
        <form onSubmit={handleSubmitProject}>
          <div className="mb-3 add-project-header modal-header">
            <h3>Add Project</h3>
            <div className="project-close">
              <CloseIcon onClick={onCloseProjectClick} />
            </div>
          </div>

          {/* icon selection */}
          <div className="mb-3 project-icon-div">
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
              Title <span className="text-danger">*</span>{" "}
            </label>
            <input type="text" maxLength={20} className="form-control" name="title" value={projectFormData.title} onChange={(e) => setProjectFormData((prevFormData) => ({ ...prevFormData, title: e.target.value }))} required />
          </div>

          {/* submit/cancel  */}
          <div className="project-modal-buttons">
            <button type="submit" className="btn btn-primary mr-" onSubmit={handleSubmitProject}>
              Submit
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
