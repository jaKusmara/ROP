import axios from "axios";

export async function createTask(user, project_id, title, description) {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/task/createTask?project_id=${project_id}`,
      {
        title: title,
        description: description,
        project_id: project_id,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}
