// const API_KEY = '';
const axios = require("axios");
require("dotenv").config();

const getCoordsForAddress = async (address) => {
  const apiKey = process.env.OPENCAGE_API_KEY; // Replace with your OpenCage API key
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);

    if (
      response.data &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lng };
    } else {
      throw new Error("Could not get coordinates for the provided address.");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw new Error("Error fetching coordinates for the provided address.");
  }
};

module.exports = getCoordsForAddress;

//dummy function
// function getCoordsForAddress(address) {
//     return {
//         lat: 40.7484474,
//         lng: -73.9871516
//     }
// }
// module.exports = getCoordsForAddress;
