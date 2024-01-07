import React, { useState } from "react";
import { CloseIcon } from "../icons/icons";

const ProjectForm = ({ onCloseProjectClick }) => {
  const [projectFormData, setProjectFormData] = useState([]);

  const handleSubmitProject = () => {};

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
