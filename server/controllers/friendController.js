const User = require("../models/userModel")

const addFriend = async (req, res) => {
    const friend_id = req.query.friend_id;
    const user_id = req.user._id;

    try {
        const friend = await User.findOne({ _id: friend_id });

        if (!friend) {
            return res.status(404).json({ error: "Friend not found" });
        }

        const user = await User.findByIdAndUpdate(
            user_id,
            { $push: { friends: friend._id } },
            { new: true }
        );

        if (user) {
            return res.status(200).json({ message: "Successfully added friend" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const allUserFriends = async (req, res) => {
    const user_id = req.user._id

    try {
        let friendList = [];

        const user = await User.findById(user_id)
        const friends = await Promise.all(
            user.friends.map((friendId) => {
              return User.findById(friendId);
            })
          );

          friends.map((friend) => {
            const { _id, username, firstname, surname } = friend;
            friendList.push({ _id, username, firstname, surname });
          })

        res.status(200).json(friendList)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = {addFriend, allUserFriends} 