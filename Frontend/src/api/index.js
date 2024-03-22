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
