import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import PlacesList from "../components/PlacesList";
import { useHttpClient } from "../../shared/hooks/http-hook";
// import ErrorModal from "../../shared/componets/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/componets/UIElements/LoadingSpinner";
// import SearchBar from "../../Main Component/SearchBar";

const AllPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, sendRequest } = useHttpClient();

  //   const userId = useParams().userId;

  useEffect(() => {
    const fetchAllPlaces = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/places/`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPlaces();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {/* <div className="places-page-img-container">
        <SearchBar />
      </div> */}
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlacesList items={loadedPlaces} />}
    </React.Fragment>
  );
};

export default AllPlaces;
