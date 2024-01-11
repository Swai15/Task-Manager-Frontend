import React from "react";
import Project from "./Projects";

const ProjectList = ({ projects, setProjects, handleActiveProject }) => {
  return (
    <div className="project-container">
      <div>
        {projects.map((project) => (
          <div key={project.id}>
            <Project project={project} setProjects={setProjects} onClick={() => handleActiveProject(project)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
