import { useProject } from "../../hooks/useProject";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useChannelContext } from "../../hooks/useContext/useChannelContext";
import { useState } from "react";
import { useIdContext } from "../../hooks/useContext/useIdContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useChannel } from "../../hooks/useChannel";
import { useProjectContext } from "../../hooks/useContext/useProjectContext";

export default function Settings() {
  const { state: projectState } = useProjectContext();
  const { state: channelContext } = useChannelContext();
  const { state: idContext } = useIdContext();
  const { user } = useAuthContext();
  const { leaveProject, deleteProject } = useProject();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const { createChannel, deleteChannel } = useChannel();
  const [addChannel, setAddChannel] = useState(false);
  const [editChannel, setEditChannel] = useState(false);

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
      <h2 className="text-5xl">
        {projectState.project && projectState.project.title}
      </h2>
      <h2 className="mb-4 text-slate-500">
        # {projectState.project && projectState.project.connectionString}
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
        <table className="table-fixed w-full bg-neutral-600 my-5 rounded shadow-xl shadow-neutral-800 max-h-20">
          <thead>
            <tr className="text-xl">
              <th>Title</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody className="overflow-auto">
            {channelContext.channels &&
              channelContext.channels.map((channel) => (
                <tr className="text-xl h-20" key={channel._id}>
                  {editChannel ? (
                    <td>
                      <input type="text" name="" />
                    </td>
                  ) : (
                    <td>{channel.title}</td>
                  )}

                  <td>Text</td>
                  <th>
                    <button
                      onClick={() => {
                        setEditChannel(!editChannel);
                      }}
                    >
                      <EditIcon />
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => {
                        deleteChannel(user, channel._id);
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
