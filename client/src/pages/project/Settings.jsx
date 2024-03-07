import { useProject } from "../../hooks/useProject";
import { useAuthContext } from "../../hooks/useContext/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useChannelContext } from "../../hooks/useContext/useChannelContext";
import { useEffect, useState } from "react";
import { useIdContext } from "../../hooks/useContext/useIdContext";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
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
  const { createChannel, deleteChannel, editChannelTitle } = useChannel();
  const [addChannel, setAddChannel] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [desc, setDesc] = useState("");
  const [editTitle, setEditTitle] = useState(false);
  const [newChannelTitle, setNewChannelTitle] = useState("");
  const [selectedChannel, setSelectedChannel] = useState(null);
  const { dispatch: projectDispatch } = useProjectContext();

  const saveChannel = () => {
    editChannelTitle(user, selectedChannel, newChannelTitle);
    setSelectedChannel(null);
  };

  const handleLeaveProjectClick = () => {
    projectDispatch({ type: "DELETE_PROJECT", payload: idContext.project_id });
    leaveProject(user, idContext.project_id);
    navigate("/");
  };

  const handleDeleteProjectClick = () => {
    projectDispatch({ type: "DELETE_PROJECT", payload: idContext.project_id });
    deleteProject(user, idContext.project_id);
    navigate("/");
  };

  return (
    <div className="grid ">
      {editTitle ? (
        <input
          maxLength="50"
          placeholder="New Title..."
          type="text"
          value={title}
          className="text-black rounded h-10 p-1 max-w-[40%]"
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <h2 className="text-5xl md:text-3xl">
          {projectState.project && projectState.project.title}
        </h2>
      )}

      <h2 className="text-slate-500 ">
        # {projectState.project && projectState.project.connectionString}
      </h2>

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
          <div className="my-4 text-lg max-w-[60%] break-all">
            {projectState.project.description}
          </div>
        ))}

      <nav className="flex gap-x-4">
        <button
          onClick={handleLeaveProjectClick}
          className="p-2 md:p-1 bg-red-600 rounded-md"
        >
          Leave Project
        </button>
        <button
          onClick={handleDeleteProjectClick}
          className="p-2 md:p-1 bg-red-600 rounded-md"
        >
          Delete Project
        </button>
        {editDesc ? (
          <button
            className="p-2 md:p-1 bg-green-600 rounded-md"
            onClick={() => {
              setEditDesc(!editDesc);
              editProjectDescription(user, projectState.project._id, desc);
            }}
          >
            Save Description
          </button>
        ) : (
          <button
            className="p-2 md:p-1 bg-blue-600 rounded-md"
            onClick={() => {
              setEditDesc(!editDesc);
              setDesc(projectState.project.description);
            }}
          >
            Edit Description
          </button>
        )}
        {editTitle ? (
          <button
            className="p-2 md:p-1 bg-green-600 rounded-md"
            onClick={() => {
              setEditTitle(!editTitle);
              editProjectTitle(user, projectState.project._id, title);
            }}
          >
            Save Title
          </button>
        ) : (
          <button
            className="p-2 md:p-1 bg-blue-600 rounded-md"
            onClick={() => {
              setEditTitle(!editTitle);

              setTitle(projectState.project.title);
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
            className="p-2 md:p-1 bg-purple-500 rounded-md hover:bg-green-500"
            onClick={() => {
              setAddChannel(!addChannel);
              setTitle("");
            }}
          >
            Add channel
          </button>
        </nav>
        {addChannel && (
          <div className="flex flex-row mt-4 md:h-10 bg-neutral-800 w-[40%] gap-x-3 md:gap-x-1.5">
            <input
              className="text-black p-3 md:p-1 rounded w-full"
              type="text"
              name="channels"
              placeholder="Channel title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="p-2 bg-purple-500 rounded-md hover:bg-green-500"
              onClick={() => {
                setAddChannel(!addChannel);
                createChannel(user, idContext.project_id, title);
              }}
            >
              Create
            </button>
          </div>
        )}
        
        <table className="table-fixed w-full bg-neutral-600 my-5 rounded shadow-xl shadow-neutral-800">
          <thead className="border-b-2 md:border-b">
            <tr className="text-2xl md:text-lg h-12">
              <th>Title</th>
              <th>Type</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {channelContext.channels &&
              channelContext.channels.map((channel) => (
                <tr
                  className="text-xl md:h-10 md:text-base h-20 text-center"
                  key={channel._id}
                >
                  <td>
                    {selectedChannel === channel._id ? (
                      <input
                        maxLength="50"
                        placeholder="New Title..."
                        type="text"
                        value={newChannelTitle}
                        className="text-black rounded h-10 p-1 max-w-[85%]"
                        onChange={(e) => {
                          setNewChannelTitle(e.target.value);
                        }}
                      />
                    ) : (
                      <span>{channel.title}</span>
                    )}
                  </td>
                  <td>Text</td>
                  <td className="flex">
                    {selectedChannel === channel._id ? (
                      <>
                        <div
                          className="w-fit justify-center hover:bg-green-500 rounded items-center mt-1.5"
                          onClick={() => {
                            saveChannel();
                          }}
                        >
                          <SaveIcon />
                        </div>
                        <div
                          className="w-fit justify-self-center hover:bg-red-500 rounded mt-1.5"
                          onClick={() => deleteChannel(user, channel._id)}
                        >
                          <DeleteIcon />
                        </div>
                      </>
                    ) : (
                      <div
                        onClick={() => {
                          setSelectedChannel(channel._id);
                          setNewChannelTitle(channel.title);
                        }}
                        className="w-fit justify-self-center hover:bg-purple-500 rounded"
                      >
                        <SettingsIcon />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
