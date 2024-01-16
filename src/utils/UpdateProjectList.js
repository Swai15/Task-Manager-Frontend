const updateProjectList = async (setProjects, authTokens) => {
  const URL = " http://127.0.0.1:8000/api/";

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
