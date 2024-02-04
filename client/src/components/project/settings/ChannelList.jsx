

export default function ChannelList() {
  return (
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
  );
}
