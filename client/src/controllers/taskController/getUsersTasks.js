import axios from "axios";

export async function getUserTasks(user) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/task/getUserTasks`,
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
