import axios from "axios";

export async function getAllProjectTasks(user, projectId) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/task/getAllProjectTasks/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
