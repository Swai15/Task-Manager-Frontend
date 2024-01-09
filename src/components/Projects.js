import React from "react";
import { Card, Badge } from "react-bootstrap"; // Import Card and Badge from react-bootstrap

const Project = ({ project, onClick }) => {
  const completedTasks = project.tasks.filter((task) => task.completed).length;
  const totalTasks = project.tasks.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="cursor project-card-container" key={project.id} onClick={() => onClick(project)}>
      <div className="project-card">
        <div className="project-card-contents">
          <p className="project-card-icon">📂</p>
          <h4>{project.title}</h4>
          <p>{project.tasks.length} Tasks</p>

          {/* Progress bar */}
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: `${completionPercentage}%` }} aria-valuenow={completionPercentage} aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
