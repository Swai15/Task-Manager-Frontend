const updateProjectList = async (setProjects) => {
  const URL = " http://127.0.0.1:8000/api/";

  try {
    // console.log(setProjects);
    const response = await fetch(URL + "projects/");
    const updatedData = await response.json();
    setProjects(updatedData);
  } catch (error) {
    console.error("Error fetching updated projects ", error);
  }
};

export default updateProjectList;
