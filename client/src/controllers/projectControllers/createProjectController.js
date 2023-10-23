import axios from "axios";

export async function createProject(user, title, description) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/project/createProject",
      {
        title: title,
        description: description,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}
