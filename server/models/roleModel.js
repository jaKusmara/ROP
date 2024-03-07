const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  role: {
    type: String,
    required: true,
  },

  permisions: {
    channelPermisions: {
      createChannel: {
        type: Boolean,
        default: false,
      },

      deleteChannel: {
        type: Boolean,
        default: false,
      },

      editChannel: {
        type: Boolean,
        default: false,
      },
    },

    peopleHandlingPermisions: {
      invitePeople: {
        type: Boolean,
        default: false,
      },
      kickPeople: {
        type: Boolean,
        default: false,
      },
    },

    listPermisions: {
      createList: {
        type: Boolean,
        default: false,
      },
      deleteList: {
        type: Boolean,
        default: false,
      },
      editList: {
        type: Boolean,
        default: false,
      },
    },

    taskPermisions: {
      createTask: {
        type: Boolean,
        default: false,
      },
      deleteTask: {
        type: Boolean,
        default: false,
      },
      editTask: {
        type: Boolean,
        default: false,
      },
    },
  },
});

roleSchema.statics.updateRole = async function (role, project_id, user_id) {
  if (!project_id) {
    throw Error("Bad project ID");
  }

  if (!user_id) {
    throw Error("Bad user ID");
  }

  if (!role) {
    throw Error("Can not create a role");
  }

  const project = await mongoose.model("Project").findById(project_id)

  

  return role;
};

module.exports = mongoose.model("Role", roleSchema);
