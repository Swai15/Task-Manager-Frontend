import React, { useContext, useEffect, useState } from "react";
import { CloseIcon } from "../icons/icons";
import updateProjectList from "../utils/UpdateProjectList";
import AuthContext from "../context/AuthContext";

const EditTaskForm = ({ onCloseEditModal, setSelectedProject, activeProjectId, taskToEdit, setProjects }) => {
  const { authTokens } = useContext(AuthContext);
  const [projectsOptions, setProjectsOptions] = useState([]);
  const isEditing = !!taskToEdit;

  const [formData, setFormData] = useState({
    task: {
      title: taskToEdit.title || "",
      description: taskToEdit.description || "",
      due_date: taskToEdit.due_date || "",
      priority: taskToEdit.priority || "Low",
      project: taskToEdit.project.id || null,
      completed: taskToEdit.completed || false,
    },
    project: {
      title: "",
    },
  });

  // fetch projects for task field options
  const URL = "http://127.0.0.1:8000/api/";

  const fetchProjects = async () => {
    try {
      const response = await fetch(URL + "projects/");
      const data = await response.json();
      setProjectsOptions(data);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle both creation and editing of tasks
  const handleSubmitTask = async (e) => {
    e.preventDefault();
    console.log(formData.task);

    try {
      const response = await fetch(`${URL}tasks/${taskToEdit.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData.task),
      });

      // update state after a successful post
      if (response.ok) {
        console.log(`Edit task successfully`);

        const updatedList = await fetch(`${URL}projects/${activeProjectId}`);
        const updatedListData = await updatedList.json();
        setSelectedProject(updatedListData);
        updateProjectList(setProjects, authTokens);
        console.log(updatedListData);

        // empty task form values
        setFormData({
          task: {
            title: "",
            description: "",
            due_date: "",
            priority: "",
            project: null,
            completed: false,
          },
          project: { title: "" },
        });

        onCloseEditModal();
      } else {
        console.error(`Failed to edit task`);
      }
    } catch (error) {
      console.error(`Error editing task:`, error);
    }
  };

  return (
    <div className="task-modal-overlay">
      <div className="task-modal">
        <form onSubmit={handleSubmitTask}>
          <div className="task-close">
            <CloseIcon onClick={onCloseEditModal} />
          </div>

          {/* title */}
          <div className="mb-3">
            <label className="form-label">
              {" "}
              Title <span className="text-danger">*</span>
            </label>
            <input type="text" className="form-control" name="title" value={formData.task.title} onChange={(e) => setFormData({ ...formData, task: { ...formData.task, title: e.target.value } })} />
          </div>

          {/* description */}
          <div className="mb-3">
            <label className="form-label"> Description</label>
            <input type="text" className="form-control" name="description" value={formData.task.description} onChange={(e) => setFormData({ ...formData, task: { ...formData.task, description: e.target.value } })} />
          </div>

          {/* due date */}
          <div className="mb-3">
            <label className="form-label">
              {" "}
              Due Date <span className="text-danger">*</span>
            </label>
            <input type="date" className="form-control" name="due_date" value={formData.task.due_date} onChange={(e) => setFormData({ ...formData, task: { ...formData.task, due_date: e.target.value } })} />
          </div>

          {/* priority */}
          <div className=" mb-3">
            <label className="form-label">Priority:</label>
            <select name="priority" id="" className="form-select" value={formData.task.priority} onChange={(e) => setFormData({ ...formData, task: { ...formData.task, priority: e.target.value } })}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* project */}
          <div className=" mb-3">
            <label className="form-label">
              Project <span className="text-danger">*</span>
            </label>
            <select
              required
              name="project"
              id=""
              className="form-select"
              value={formData.task.project || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  task: { ...formData.task, project: e.target.value },
                })
              }
            >
              <option value="" disabled>
                Select a project
              </option>
              {projectsOptions.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          {/* submit */}
          <div>
            <button type="submit" className="btn btn-primary mr-" onSubmit={handleSubmitTask}>
              Update
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCloseEditModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskForm;
