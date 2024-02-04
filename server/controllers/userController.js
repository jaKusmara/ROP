const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

//login user
const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.login(identifier, password);

    // Create token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//singup user
const signupUser = async (req, res) => {
  const {
    firstname,
    surname,
    email,
    username,
    password,
    reTypePassword,
    avatar,
  } = req.body;

  try {
    const user = await User.signup(
      firstname,
      surname,
      email,
      username,
      password,
      reTypePassword,
      avatar
    );

    // Create token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
