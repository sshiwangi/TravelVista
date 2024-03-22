const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const User = require("../models/user");

const cache = require("memory-cache");

const getUsers = async (req, res, next) => {
  // let users;
  try {
    const cachedUsers = cache.get("users");
    if (cachedUsers) {
      return res.json({ users: cachedUsers });
    }
    const users = await User.find({}, "-password");
    const userArray = users.map((user) => user.toObject({ getters: true }));
    cache.put("users", userArray, 5 * 60 * 1000);
    res.json({ users: userArray });
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later",
      500
    );
    return next(error);
  }
  // res.json({
  //   users: (await users).map((user) => user.toObject({ getters: true })),
  // });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Singin up failed, please try again later",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead",
      422
    );
    return next(error);
  }
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Could not create user", 500);
    return next(error);
  }

  let imagePath;

  if (req.file && req.file.path) {
    imagePath = req.file.path;
    console.log(req.file.path);
  } else {
    imagePath =
      "https://media.istockphoto.com/id/1368424494/photo/studio-portrait-of-a-cheerful-woman.webp?b=1&s=170667a&w=0&k=20&c=VEE1756TeCzYH2uPsFZ_P8H3Di2j_jw8aOT6zd7V8JY=";
  }
  const createdUser = new User({
    name,
    email,
    image: imagePath,
    password: hashedPassword,
    places: [],
  });
  console.log(createdUser);
  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Signing up failed, please try again", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again later",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again", 500);
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};
const getUsersById = async (req, res, next) => {
  // console.log(req.body);
  const userId = req.params.uid;

  let user;

  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find this user",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find a user for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ user: user.toObject({ getters: true }) }); //=> {place} => {place: place}
};

const searchUsersByName = async (req, res, next) => {
  const { name } = req.query; // Assuming the query parameter is 'name'

  let users;
  try {
    users = await User.find({ name: { $regex: new RegExp(name, "i") } }).select(
      "-password"
    );
  } catch (err) {
    const error = new HttpError(
      "Fetching users by name failed, please try again later",
      500
    );
    return next(error);
  }

  if (!users || users.length === 0) {
    const error = new HttpError("No users found with the provided name.", 404);
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.getUsersById = getUsersById;
exports.searchUsersByName = searchUsersByName;
