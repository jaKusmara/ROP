import axios from "axios";

export async function leaveTask(user, taskId) {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/task/leaveTask/${taskId}`,
      null, 
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
