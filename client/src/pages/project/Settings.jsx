import { useProject } from "../../hooks/useProject";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useChannelContext } from "../../hooks/useContext/useChannelContext";
import { useEffect, useState } from "react";
import { useIdContext } from "../../hooks/useContext/useIdContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import { useChannel } from "../../hooks/useChannel";
import { useProjectContext } from "../../hooks/useContext/useProjectContext";

export default function Settings() {
  const { state: projectState } = useProjectContext();
  const { state: channelContext } = useChannelContext();
  const { state: idContext } = useIdContext();
  const { user } = useAuthContext();
  const {
    leaveProject,
    deleteProject,
    editProjectTitle,
    editProjectDescription,
  } = useProject();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const { createChannel, deleteChannel } = useChannel();
  const [addChannel, setAddChannel] = useState(false);
  const [optionsChannel, setOptionsChannel] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [desc, setDesc] = useState("");
  const [editTitle, setEditTitle] = useState(false);

  const handleLeaveProjectClick = () => {
    leaveProject(user, idContext.project_id);
    navigate("/");
  };

  const handleDeleteProjectClick = () => {
    deleteProject(user, idContext.project_id);
    navigate("/");
  };

  console.log(projectState);

  return (
    <div className="grid">
      {editTitle ? (
        <input />
      ) : (
        <h2 className="text-5xl">
          {projectState.project && projectState.project.title}
        </h2>
      )}

      <h2 className="text-slate-500">
        # {projectState.project && projectState.project.connectionString}
      </h2>
      <h2>
        {projectState.project &&
          (editDesc ? (
            <textarea
              maxLength="250"
              placeholder="Project description..."
              className="text-white rounded text-lg h-20 resize-none p-2 w-1/3 my-2 bg-neutral-700"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            ></textarea>
          ) : (
            <div className="my-4 text-lg">
              {projectState.project.description}
            </div>
          ))}
      </h2>
      <nav className="flex gap-x-4">
        <button
          onClick={handleLeaveProjectClick}
          className="p-2 bg-red-600 rounded-md"
        >
          Leave Project
        </button>
        <button
          onClick={handleDeleteProjectClick}
          className="p-2 bg-red-600 rounded-md"
        >
          Delete Project
        </button>
        {editDesc ? (
          <button
            className="p-2 bg-green-600 rounded-md"
            onClick={() => {
              setEditDesc(!editDesc);
              editProjectDescription(user, projectState.project._id, desc);
              setDesc("");
            }}
          >
            Save Description
          </button>
        ) : (
          <button
            className="p-2 bg-blue-600 rounded-md"
            onClick={() => {
              setEditDesc(!editDesc);
            }}
          >
            Edit Description
          </button>
        )}
        {editTitle ? (
          <button
            className="p-2 bg-green-600 rounded-md"
            onClick={() => {
              setEditTitle(!editTitle);
              editProjectTitle(user, projectState.project._id, title);
              setEditTitle("");
            }}
          >
            Save Title
          </button>
        ) : (
          <button
            className="p-2 bg-blue-600 rounded-md"
            onClick={() => {
              setEditTitle(!editTitle);
            }}
          >
            Edit Title
          </button>
        )}
      </nav>

      <hr className="my-4" />
      <section className="w-[90%] justify-self-center">
        <h2 className="text-4xl text-center">Channels</h2>
        <nav>
          <button
            className="p-2 bg-purple-500 rounded-md hover:bg-green-500"
            onClick={() => {
              setAddChannel(!addChannel);
              setTitle("");
            }}
          >
            Add channel
          </button>
        </nav>
        {addChannel && (
          <div className="flex flex-row mt-4 bg-neutral-800 w-1/3">
            <input
              className="text-black p-3 rounded w-full"
              type="text"
              name="channels"
              placeholder="Channel title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="p-1 bg-purple-500 rounded-md hover:bg-green-500"
              onClick={() => {
                setAddChannel(!addChannel);
                createChannel(user, idContext.project_id, title);
              }}
            >
              Create Channel
            </button>
          </div>
        )}
        <table className="table-fixed w-full bg-neutral-600 my-5 rounded shadow-xl shadow-neutral-800 border-b-2">
          <thead className="border-b-2">
            <tr className="text-2xl h-16">
              <th>Title</th>
              <th>Type</th>
              <th>Options</th>
            </tr>
          </thead>

          <tbody>
            {channelContext.channels &&
              channelContext.channels.map((channel) => (
                <tr className="text-xl h-20 text-center" key={channel._id}>
                  <td>{channel.title}</td>
                  <td>Text</td>
                  <td
                    onClick={() => {
                      setOptionsChannel(!optionsChannel);
                    }}
                  >
                    <SettingsIcon />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
