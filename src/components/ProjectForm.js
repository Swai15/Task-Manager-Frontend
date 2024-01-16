import React, { useContext, useState } from "react";
import { CloseIcon } from "../icons/icons";
import AuthContext from "../context/AuthContext";
import updateProjectList from "../utils/UpdateProjectList";

const ProjectForm = ({ onCloseProjectClick, setProjects }) => {
  let { authTokens } = useContext(AuthContext);
  const [projectFormData, setProjectFormData] = useState({ title: "" });

  const URL = "http://127.0.0.1:8000/api/";

  // fetch updated project list
  // const updateProjectList = async () => {
  //   try {
  //     const response = await fetch(URL + "projects/");
  //     const updatedData = await response.json();
  //     setProjects(updatedData);
  //   } catch (error) {
  //     console.error("Error fetching updated projects ", error);
  //   }
  // };

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
        });
      } else {
        console.log("Failed to submit project");
      }
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  return (
    <div className="project-modal-overlay">
      <div className="project-modal">
        <form onSubmit={handleSubmitProject}>
          <div className="project-close">
            <CloseIcon onClick={onCloseProjectClick} />
          </div>

          {/* title */}
          <div className="mb-3">
            <label className="form-label"> Title:</label>
            <input type="text" className="form-control" name="title" value={projectFormData.title} onChange={(e) => setProjectFormData({ title: e.target.value })} required />
          </div>

          {/* submit  */}
          <div>
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
