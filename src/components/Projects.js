import React from "react";

const Project = ({ project, onClick }) => {
  return (
    <div key={project.id} onClick={() => onClick(project)}>
      <h3>{project.title}</h3>
    </div>
  );
};

export default Project;
