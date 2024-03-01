import React from "react";
import Project from "./Projects";

const ProjectList = ({ projects, setProjects, handleActiveProject }) => {
  const noProjects = projects.length === 0;

  return (
    <div className="project-container">
      <div>
        {noProjects && (
          <div className="projects-empty-container">
            <div className="projects-empty">
              <img src="/Images/sleepingCat.gif" alt="" onContextMenu={(e) => e.preventDefault()} draggable="false" />
              <p>You don't have any projects yet</p>
            </div>
          </div>
        )}
      </div>

      {projects.map((project) => (
        <div key={project.id}>
          <Project project={project} setProjects={setProjects} onClick={() => handleActiveProject(project)} />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
