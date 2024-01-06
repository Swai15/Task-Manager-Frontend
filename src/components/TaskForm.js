import React, { useEffect, useState } from "react";
import { CloseIcon } from "../icons/icons";

const TaskForm = ({ onCloseTaskClick }) => {
  const [projectsOptions, setProjectsOptions] = useState([]);
  const [formData, setFormData] = useState({
    task: {
      title: "",
      description: "",
      due_date: "",
      priority: "Low",
      project: null,
      completed: false,
    },
    project: {
      title: "",
    },
  });

  // fetch projects
  const URL = "http://127.0.0.1:8000/api";

  const fetchProjects = async () => {
    try {
      const response = await fetch(URL + "/projects");
      const data = await response.json();
      setProjectsOptions(data);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  // Post task

  const handleSubmitTask = (e) => {
    console.log("Task submitted");
    console.log(formData);
    e.preventDefault();
  };

  return (
    <div className="task-modal-overlay">
      <div className="task-modal">
        <form onSubmit={handleSubmitTask}>
          <div className="task-close">
            <CloseIcon onClick={onCloseTaskClick} />
          </div>

          {/* title */}
          <div className="mb-3">
            <label className="form-label"> Title:</label>
            <input type="text" className="form-control" name="title" value={formData.task.title} onChange={(e) => setFormData({ ...formData, task: { ...formData.task, title: e.target.value } })} />
          </div>

          {/* description */}
          <div className="mb-3">
            <label className="form-label"> Description:</label>
            <input type="text" className="form-control" name="description" value={formData.task.description} onChange={(e) => setFormData({ ...formData, task: { ...formData.task, description: e.target.value } })} />
          </div>

          {/* due date */}
          <div className="mb-3">
            <label className="form-label"> Due Date:</label>
            <input type="date" className="form-control" name="due_date" value={formData.due_date} onChange={(e) => setFormData({ ...formData, task: { ...formData.task, due_date: e.target.value } })} />
          </div>

          {/* priority */}
          <div>
            <label className="form-label">Priority:</label>
            <select name="priority" id="" className="form-select" value={formData.task.title} onChange={(e) => setFormData({ ...formData, task: { ...formData.task, priority: e.target.value } })}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* project */}
          <div className=" mb-3">
            <label className="form-label">Project:</label>
            <select
              required
              name="project"
              id=""
              className="form-select"
              value={formData.task.project ? formData.task.project.title : ""}
              onChange={(e) => {
                const selectedProject = projectsOptions.find((project) => project.title === e.target.value);
                setFormData({
                  ...formData,
                  task: { ...formData.task, project: selectedProject.title },
                });
              }}
            >
              <option value="" disabled>
                Select a project
              </option>
              {projectsOptions.map((project) => (
                <option key={project.id} value={project.title}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          {/* submit  */}
          <div>
            <button type="submit" className="btn btn-primary mr-" onSubmit={handleSubmitTask}>
              Submit
            </button>
            <button type="submit" className="btn btn-secondary" onClick={onCloseTaskClick}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
