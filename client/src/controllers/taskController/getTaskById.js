import axios from "axios";

export async function getTaskById(user, taskId) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/task/getTaskById/${taskId}`,
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
