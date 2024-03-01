const updateProjectList = async (setProjects, authTokens) => {
  const URL = "https://jules.pythonanywhere.com/api/";

  try {
    // console.log(setProjects);
    const response = await fetch(URL + "projects/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    const updatedData = await response.json();
    setProjects(updatedData);
  } catch (error) {
    console.error("Error fetching updated projects ", error);
  }
};

export default updateProjectList;
