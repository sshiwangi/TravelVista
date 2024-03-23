export const fetchSearchQuery = async (searchTerm) => {
  try {
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/users/search?name=${searchTerm}`
    );
    const data = await response.json();
    return data.users; // Return the data after parsing JSON
  } catch (err) {
    throw new Error("Failed to fetch search query"); // Throw the error for handling elsewhere
  }
};

export const fetchAllPlaces = async () => {
  try {
    const responseData = await fetch(
      process.env.REACT_APP_BACKEND_URL + `/places/`
    );
    return responseData.places;
  } catch (err) {
    throw err; // Rethrow the error to handle it in the component
  }
};
