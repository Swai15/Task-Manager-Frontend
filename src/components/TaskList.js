import React from "react";
import Task from "./Task";
import { AddTaskIcon, ArrowLeftIcon } from "../icons/icons";
import TaskForm from "./TaskForm";
import { DefaultListIcon, HealthIcon, HomeIcon, JobIcon, SavingsIcon, SocialIcon } from "../icons/projectsIcons";

const TaskList = ({ todayTasks, tomorrowTasks, futureTasks, overdueTasks, setProjects, projects, onCloseTaskClick, selectedProject, setSelectedProject, activeProjectId, handleBackToProjects, handleAddTaskClick, taskModal, handleCloseTaskClick }) => {
  const getProjectTitle = () => {
    const project = projects.find((project) => project.id === activeProjectId);
    return project ? project.title : "";
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

  const displayIcon = () => {
    return iconMap[selectedProject.icon];
  };

  const noTasks = todayTasks.length === 0 && tomorrowTasks.length === 0 && futureTasks.length === 0 && overdueTasks.length === 0;

  return (
    <div className="selected-project-tasks">
      {/* Work on project icons */}

      <div className="task-header">
        <div className="back-button">
          <ArrowLeftIcon onClick={handleBackToProjects} />
        </div>
        <h3 className="task-title-header">
          {displayIcon()} <span className="project-title-name">{getProjectTitle()}</span>
        </h3>
        <div className="task-add">
          <AddTaskIcon onClick={handleAddTaskClick} />
        </div>

        {/* Add task */}
      </div>

      <div>
        {noTasks && (
          <div className="tasks-empty-container">
            <div className="tasks-empty">
              <img src="/Images/sleepingCat.gif" alt="" draggable="false" onContextMenu={(e) => e.preventDefault()} />
              <p>You have no tasks in this project</p>
            </div>
          </div>
        )}
      </div>

      {/* Add task modal */}
      {taskModal && <TaskForm setProjects={setProjects} onCloseTaskClick={handleCloseTaskClick} setSelectedProject={setSelectedProject} activeProjectId={activeProjectId} />}

      {/* Todays Tasks */}
      <div className="task-content">
        {todayTasks.length > 0 && (
          <>
            <h4 className="task-topic">Today </h4>
            <div>
              {todayTasks.map((task) => (
                <div key={task.id} className="col-md-4 mb-3">
                  <Task setProjects={setProjects} task={task} projects={projects} onCloseTaskClick={onCloseTaskClick} setSelectedProject={setSelectedProject} activeProjectId={activeProjectId} />
                </div>
              ))}
            </div>
          </>
        )}
        {/* Tomorrow's tasks */}
        {tomorrowTasks.length > 0 && (
          <>
            <h4 className="task-topic">Tomorrow</h4>
            <div>
              {tomorrowTasks.map((task) => (
                <div key={task.id} className="col-md-4 mb-3">
                  <Task setProjects={setProjects} task={task} projects={projects} onCloseTaskClick={onCloseTaskClick} setSelectedProject={setSelectedProject} activeProjectId={activeProjectId} />
                </div>
              ))}
            </div>
          </>
        )}
        {/* Future tasks */}
        {futureTasks.length > 0 && (
          <>
            <h4 className="task-topic">Future </h4>
            <div>
              {futureTasks.map((task) => (
                <div key={task.id} className="col-md-4 mb-3">
                  <Task setProjects={setProjects} task={task} projects={projects} onCloseTaskClick={onCloseTaskClick} setSelectedProject={setSelectedProject} activeProjectId={activeProjectId} />
                </div>
              ))}
            </div>
          </>
        )}
        {/* Overdue tasks */}
        {overdueTasks.length > 0 && (
          <>
            <h4 className="task-topic">Overdue </h4>
            <div>
              {overdueTasks.map((task) => (
                <div key={task.id} className="col-mb-4 mb-3">
                  <Task setProjects={setProjects} task={task} onCloseTaskClick={onCloseTaskClick} projects={projects} setSelectedProject={setSelectedProject} activeProjectId={activeProjectId} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskList;
