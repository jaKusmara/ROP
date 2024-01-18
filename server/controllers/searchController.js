const User = require("../models/userModel");

const searchUsers = async (req, res) => {
  const query = req.query.query;

  try {
    const regexPattern = new RegExp(query, "i");

    const searchResults = await User.find({
      $or: [
        { firstname: regexPattern },
        { surname: regexPattern },
        { username: regexPattern },
      ],
    });

    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = searchUsers;
