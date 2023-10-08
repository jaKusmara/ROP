const User = require('../models/userModel')

const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    const regexPattern = new RegExp(query, 'i');

    const searchResults = await User.find({
      $or: [
        { firstname: regexPattern },
        { surname: regexPattern },
        { username: regexPattern },
        { email: regexPattern },
      ],
    });

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = searchUsers