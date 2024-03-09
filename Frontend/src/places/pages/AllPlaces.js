import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlacesList from "../components/PlacesList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/componets/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/componets/UIElements/LoadingSpinner";

const AllPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

  //   const placeDeletedHandler = (deletedPlaceId) => {
  //     setLoadedPlaces((prevPlaces) =>
  //       prevPlaces.filter((place) => place.id !== deletedPlaceId)
  //     );
  //   };
  console.log(loadedPlaces);
  return (
    <React.Fragment>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      {/* {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )} */}
      {!isLoading && loadedPlaces && <PlacesList items={loadedPlaces} />}
    </React.Fragment>
  );
};

export default AllPlaces;
