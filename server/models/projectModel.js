const mongoose = require("mongoose");
const User = require("./userModel");

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
        role: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
          required: false,
        },
      },
    ],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
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
  const project = await this.findById(_id);

  if (!project) {
    throw Error("Bad project ID");
  }

  const users = await Promise.all(
    project.members.map(async (member) => {
      const user = await User.findById(member.user_id);
      return {
        user_id: user._id,
        username: user.username,
        firstname: user.firstname,
        surname: user.surname,
        avatar: user.avatar,
        email: user.email,
      };
    })
  );

  const projectWithUsers = {
    ...project.toObject(),
    users,
  };

  console.log(projectWithUsers);

  return projectWithUsers;
};

// projectSchema.statics.getUserProjects = async function (user_id) {
//   const projects = await this.find({
//     "members.user_id": user_id,
//   });

//   if (!projects || projects.length === 0) {
//     throw Error("No projects for the user");
//   }

//   return projects;
// };

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

module.exports = mongoose.model("Project", projectSchema);
