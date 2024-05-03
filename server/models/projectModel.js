const mongoose = require("mongoose");
const randomToken = require("random-token").create(
  "abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
);

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    members: [
      {
        _id: false,
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        permisionsAndRole_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
          required: true,
        },
      },
    ],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    connectionString: {
      type: String,
      required: true,
      unique: true,
    },
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true,
      },
    ],
    board_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.statics.getUserProjects = async function (user_id) {
  const projects = await this.find({
    "members.user_id": user_id,
  });

  if (!projects || projects.length === 0) {
    return [];
  }

  return projects;
};

projectSchema.statics.getProjectById = async function (_id) {
  if (!_id) {
    throw new Error("Bad project ID");
  }

  const project = await this.findById(_id);
  if (!project) {
    throw new Error("Project not found");
  }

  const members = await Promise.all(
    project.members.map(async (member) => {
      const userDetails = await mongoose.model("User").findById(member.user_id);
      const roleDetails = await mongoose
        .model("Role")
        .findById(member.permisionsAndRole_id);

      return {
        user_id: userDetails._id,
        firstname: userDetails.firstname,
        surname: userDetails.surname,
        username: userDetails.username,
        avatar: userDetails.avatar,
        role: roleDetails.role,
        permisions: roleDetails.permisions,
      };
    })
  );

  const channels = await Promise.all(
    project.channels.map(async (channel) => {
      const channelDetails = await mongoose
        .model("Channel")
        .findById(channel._id);

      return {
        _id: channelDetails._id,
        title: channelDetails.title,
        type: channelDetails.type,
      };
    })
  );

  const lists = await Promise.all(
    
  )

  console.log(lists)

  return {
    _id: project._id,
    members: members,
    title: project.title,
    description: project.description,
    connectionString: project.connectionString,
    channels: channels,
    lists: project.lists,
    tasks: project._id,
    board_id: project._id,
  };
};

projectSchema.statics.getAllProjectChannels = async function (_id) {
  const project = await this.findById(_id);

  if (!project) {
    throw Error("Bad project ID");
  }

  const channelIds = project.channels;

  const channels = await mongoose.model("Channel").find({
    _id: { $in: channelIds },
  });

  return channels;
};

projectSchema.statics.createNewProject = async function (
  user_id,
  title,
  description
) {
  if (!title) {
    throw Error("Bad project title");
  }

  if (!user_id) {
    throw Error("Bad user ID");
  }

  const connectionString = randomToken(8);

  const board = await mongoose.model("Board").create({ title: title });

  const permisionsAndRole = await mongoose
    .model("Role")
    .create({ role: "projectManager" });

  if (!description) {
    newProject = await this.create({
      members: [{ user_id, permisionsAndRole_id: permisionsAndRole._id }],
      title,
      description: "",
      connectionString,
      board_id: board._id,
      channels: [],
    });
  } else {
    newProject = await this.create({
      members: [{ user_id, permisionsAndRole_id: permisionsAndRole._id }],
      title,
      description,
      connectionString,
      board_id: board._id,
      channels: [],
    });
  }

  const channel = await mongoose.model("Channel").create({
    members: [user_id],
    title: "General",
    project_id: newProject._id,
    type: "general",
  });

  await this.findByIdAndUpdate(
    newProject._id,
    { $push: { channels: channel._id } },
    { new: true }
  );

  return newProject;
};

module.exports = mongoose.model("Project", projectSchema);
