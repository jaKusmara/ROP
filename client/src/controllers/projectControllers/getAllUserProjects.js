import axios from "axios";

export async function getAllUserProject(user) {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/project/getAllUserProjects",
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
