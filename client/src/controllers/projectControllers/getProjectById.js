import axios from "axios";

export async function getProjectById(user, project_id) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/project/getProjectById/${project_id}`,
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
