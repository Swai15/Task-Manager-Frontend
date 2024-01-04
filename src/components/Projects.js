import React from "react";

const Project = ({ project }) => {
  return (
    <div key={project.id}>
      <h3>{project.title}</h3>
    </div>
  );
};

export default Project;
