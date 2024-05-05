const fs = require("fs");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const axios = require("axios");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");
const User = require("../models/user");
const mongoose = require("mongoose");

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) }); //=> {place} => {place: place}
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // let places;
  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(userId).populate("places");
  } catch (err) {
    const error = new HttpError(
      "Fetchig places failed, please try again later",
      500
    );
    return next(error);
  }

  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    return next(
      new Error("Could not find a places for the provided user id.", 404)
    );
  }
  res.json({
    places: userWithPlaces.places.map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address, image } = req.body;
  //validating the address
  if (!isValidAddress(address)) {
    return next(new HttpError("Invalid address format.", 422));
  }
  console.log(address);
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
    // console.log(coordinates);
    if (!isValidCoordinates(coordinates)) {
      return next(
        new HttpError("Invalid coordinates from the geocoding API.", 500)
      );
    }
  } catch (error) {
    // console.log(error);
    return next(error);
  }

  let imagePath;

  if (req.file && req.file.path) {
    imagePath = req.file.path;
    // console.log(imagePath);
  } else {
    imagePath =
      "https://media.istockphoto.com/id/1368424494/photo/studio-portrait-of-a-cheerful-woman.webp?b=1&s=170667a&w=0&k=20&c=VEE1756TeCzYH2uPsFZ_P8H3Di2j_jw8aOT6zd7V8JY=";
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: imagePath,
    creator: req.userData.userId,
  });
  // console.log(createdPlace);
  let user;
  try {
    user = await User.findById(req.userData.userId);
    // console.log(user);
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  // console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

// Function to validate the address format
const isValidAddress = (address) => {
  return !!address.trim();
};

// Function to validate coordinates from the geocoding API response
const isValidCoordinates = (coordinates) => {
  return (
    coordinates &&
    typeof coordinates.lat === "number" &&
    typeof coordinates.lng === "number"
  );
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  // console.log(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;
  // console.log(title);
  // console.log(placeId);
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Could not update place",
      500
    );
    return next(error);
  }

  if (place.creator.toString() !== req.userData.userId) {
    const error = new HttpError("You are not allowed to edit this place", 401);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Could not update place",
      500
    );
    return next(error);
  }
  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Could not delete place",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError("Could not find place for this id.", 404);
    return next(error);
  }

  if (place.creator.id !== req.userData.userId) {
    const error = new HttpError("You are not allowed to edit this place", 401);
  }

  const imagePath = place.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    if (place.creator) {
      place.creator.places.pull(place);
      await place.creator.save({ session: sess });
    }

    await place.deleteOne({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    // console.log(err);
    const error = new HttpError(
      "Something went wrong, Could not remove place",
      500
    );
    return next(error);
  }

  fs.unlink(imagePath, (err) => {
    // console.log(err);
  });

  res.status(200).json({ message: "deleted place" });
};

const getAllPlaces = async (req, res, next) => {
  let places;
  try {
    places = await Place.aggregate([
      { $sort: { views: -1 } }, // Sort places by views in descending order
    ]);
    // console.log(places);
    res.json({
      places: places,
    });
    // console.log("hello");
    // res.json({
    //   places: places.map((place) => place.toObject({ getters: true })),
    // });
    // console.log("hello");
  } catch (err) {
    console.error("Error fetching places:", err);
    const error = new HttpError(
      "Fetching places failed, please try again later",
      500
    );
    return next(error);
  }
};

// Increment view count when a user views a place
const incrementViewCount = async (req, res, next) => {
  const placeId = req.params.pid;

  try {
    const place = await Place.findById(placeId);
    if (!place) {
      return next(new HttpError("Place not found", 404));
    }

    place.views += 1;
    await place.save();

    res.status(200).json({ message: "View count incremented successfully" });
  } catch (err) {
    next(new HttpError("Failed to increment view count", 500));
  }
};

const likePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  const userId = req.userData.userId;

  let place;
  let user;

  try {
    place = await Place.findById(placeId);
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not like the place",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError("Place not found", 404);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("User not found", 404);
    return next(error);
  }

  if (place.creator.toString() === userId) {
    const error = new HttpError("You cannot like your own place", 400);
    return next(error);
  }

  // if (user.likedPlaces.includes(placeId)) {
  //   const error = new HttpError("You already liked this place", 400);
  //   return next(error);
  // }

  // Check if the user already likes the place
  const isLiked = user.likedPlaces.includes(placeId);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    if (isLiked) {
      // If already liked, unlike the place
      place.likes -= 1;
      user.likedPlaces.pull(placeId);

      await place.save({ session: sess });
      await user.save({ session: sess });

      await sess.commitTransaction();
      const updatedUser = await User.findById(userId);

      return res.status(200).json({
        message: "Place unliked successfully",
        likes: place.likes,
        likedPlaces: updatedUser.likedPlaces,
      });
    } else {
      // If not liked, like the place
      place.likes += 1;
      user.likedPlaces.push(place);
    }

    await place.save({ session: sess });
    await user.save({ session: sess });

    await sess.commitTransaction();

    const updatedUser = await User.findById(userId); // Fetch updated user data with liked places

    return res.status(200).json({
      message: "Place liked successfully",
      likes: place.likes,
      likedPlaces: updatedUser.likedPlaces, // Return updated liked places array
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not like the place",
      500
    );
    return next(error);
  }

  // return res
  //   .status(200)
  //   .json({ message: "Place liked successfully", likes: place.likes });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
exports.getAllPlaces = getAllPlaces;
exports.incrementViewCount = incrementViewCount;
exports.likePlace = likePlace;
