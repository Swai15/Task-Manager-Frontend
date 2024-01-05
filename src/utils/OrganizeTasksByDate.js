const OrganizeTasksByDate = (tasks) => {
  const todayTasks = [];
  const tomorrowTasks = [];
  const futureTasks = [];
  const overdueTasks = [];

  const currentDate = new Date();

  tasks.forEach((task) => {
    const taskDueDate = new Date(task.due_date);
    const timeDifference = taskDueDate.getTime() - currentDate.getTime();

    if (timeDifference >= 0 && timeDifference <= 86400000) {
      todayTasks.push(task);
    } else if (timeDifference >= 86400000 && timeDifference <= 172800000) {
      tomorrowTasks.push(task);
    } else if (timeDifference < 86400000) {
      overdueTasks.push(task);
    } else {
      futureTasks.push(task);
    }
  });
  return { todayTasks, tomorrowTasks, futureTasks, overdueTasks };
};

export default OrganizeTasksByDate;
