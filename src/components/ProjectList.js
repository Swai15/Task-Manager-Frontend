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
              <img src="/Images/sleepingCat.gif" alt="" />
              <p>You have no tasks in this project</p>
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
