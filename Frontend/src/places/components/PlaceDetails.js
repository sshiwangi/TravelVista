import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from "../../shared/componets/FormElements/Button";
import Modal from "../../shared/componets/UIElements/Modal";
import MapComponent from "../../shared/componets/UIElements/MapComponent";
import { AuthContext } from "../../shared/context/auth-context";

function PlaceDetails() {
  const { placeId } = useParams();
  const [placeDetails, setPlaceDetails] = useState();
  const [creatorDetails, setCreatorDetails] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userId, setUserId] = useState();
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const auth = useContext(AuthContext);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      //   props.onDelete(props.id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPlacesDetails();
  }, [sendRequest, placeId]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchCreatorDetails();
  }, [sendRequest, userId]);

  const fetchPlacesDetails = async () => {
    console.log("hello");
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/places/${placeId}`
      );
      setPlaceDetails(responseData);
      setUserId(responseData.place.creator);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCreatorDetails = async () => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/users/${userId}`
      );
      console.log(responseData);
      setCreatorDetails(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  if (!placeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={placeDetails.place.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <MapComponent
            center={placeDetails.place.location}
            zoom={16}
            // style={{ height: "200px" }}
          ></MapComponent>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you Sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <div className="flex w-full p-10 gap-10">
        <div className="w-1/2">
          <img
            className="w-full rounded-md"
            src={`${process.env.REACT_APP_ASSET_URL}/${placeDetails.place.image}`}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <p className="text-5xl font-bold">{placeDetails.place.title}</p>
            <p className="text-3xl font-medium">
              {placeDetails.place.description}
            </p>
            <p className="text-xl font-medium text-gray-400">
              {placeDetails.place.address}
            </p>
          </div>
          {creatorDetails && creatorDetails.user && (
            <div className="flex gap-2 items-center">
              <img
                className="h-[40px] w-[40px] rounded-full"
                src={`${process.env.REACT_APP_ASSET_URL}/${creatorDetails.user.image}`}
              />
              <p>{creatorDetails.user.name}</p>
            </div>
          )}
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.userId === placeDetails.place.creator && (
              <Button to={`/places/${placeId}`}>EDIT</Button>
            )}
            {auth.userId === placeDetails.place.creator && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaceDetails;
