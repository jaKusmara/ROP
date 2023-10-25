import axios from "axios";

export async function leaveProject(user, projectId) {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/project/leaveProject/${projectId}`,
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
