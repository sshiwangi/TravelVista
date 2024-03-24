import React, { useState, useContext, useEffect } from "react";
import "./PlacesItem.css";
// import Button from "../../shared/componets/FormElements/Button";
import Card from "../../shared/componets/UIElements/Card";
// import Modal from "../../shared/componets/UIElements/Modal";
// import MapComponent from "../../shared/componets/UIElements/MapComponent";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/componets/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/componets/UIElements/ErrorModal";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import Modal from "../../shared/componets/UIElements/Modal";
import Button from "../../shared/componets/FormElements/Button";

function PlacesItem(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [creatorDetails, setCreatorDetails] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likes);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [modalError, setModalError] = useState("");
  const navigate = useNavigate();
  console.log(props.id);

  const handleModalClick = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!props.creatorId) {
      return;
    }
    fetchCreatorDetails();
    // checkLikedStatus();
  }, [sendRequest, props.creatorId]);

  const fetchCreatorDetails = async () => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/users/${props.creatorId}`
      );
      console.log(responseData);
      setCreatorDetails(responseData);

      // if (auth.userId && responseData.user.likedPlaces.includes(props.id)) {
      //   setIsLiked(true);
      // } else {
      //   setIsLiked(false);
      // }
    } catch (err) {
      console.log(err);
    }
  };
  const incrementViewCount = async (id) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${id}/view`,
        "PATCH"
      );
      console.log("updated views count");
    } catch (err) {
      console.log(err);
    }
  };

  const handlePlaceItemClick = async (id) => {
    await incrementViewCount(id);
    navigate(`/places/placeDetails/${id}`);
  };

  // const checkLikedStatus = () => {
  //   // Check if the current place is liked and update the isLiked state
  //   const likedPlaces = JSON.parse(localStorage.getItem("likedPlaces")) || [];
  //   setIsLiked(likedPlaces.includes(props.id));
  // };

  const handleLikeClick = async (id) => {
    try {
      if (!auth.isLoggedIn) {
        // Show modal if user is not logged in
        setModalError("Login to like the place");
        setShowModal(true);
        console.log(modalError);
        return;
      } else if (auth.userId === props.creatorId) {
        setModalError("You cannot like your own place"); // Set error message for modal
        setShowModal(true);
        console.log("You cannot like your own place");
        return;
      }

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/places/${id}/like`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const responseData = await response.json();
      console.log("Place liked successfully");
      console.log(responseData.likes);
      // setIsLiked(!isLiked);
      // setLikeCount(responseData.likes);

      // if (isLiked) {
      //   setIsLiked(false); // If already liked, unlike the place
      //   setLikeCount((prevCount) => prevCount - 1);
      // } else {
      //   setIsLiked(true); // If not liked, like the place
      //   setLikeCount((prevCount) => prevCount + 1);
      // }

      // const likedPlaces = JSON.parse(localStorage.getItem("likedPlaces")) || [];
      // if (isLiked) {
      //   const updatedLikedPlaces = likedPlaces.filter(
      //     (placeId) => placeId !== id
      //   );
      //   localStorage.setItem("likedPlaces", JSON.stringify(updatedLikedPlaces));
      // } else {
      //   localStorage.setItem(
      //     "likedPlaces",
      //     JSON.stringify([...likedPlaces, id])
      //   );
      // }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <li className="places-item">
        <div className="w-full" onClick={() => handlePlaceItemClick(props.id)}>
          <Card className="places-item__content">
            {isLoading && <LoadingSpinner asOverlay />}
            <div className=" rounded-md">
              <img
                className="w-full h-[16rem] object-cover rounded-md"
                src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
                alt={props.title}
              />
            </div>
            <div className="places-item__info">
              <h2>{props.title}</h2>
              {/* <div className="flex items-center gap-2">
                <FaRegHeart
                  style={{ color: isLiked ? "pink" : "#9E9EA7" }}
                  size={24}
                  onClick={() => handleLikeClick(props.id)}
                />
                <IoBookmarkOutline style={{ color: "#9E9EA7" }} size={24} />
              </div> */}
              {/* <h3>{props.address}</h3>
            <p>{props.description}</p> */}
            </div>
            {/* <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div> */}
          </Card>
        </div>
        <div className="flex justify-between">
          {creatorDetails && creatorDetails.user && (
            <div
              onClick={() => navigate(`/profile/${props.creatorId}`)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                className="h-[40px] w-[40px] rounded-full"
                src={`${process.env.REACT_APP_ASSET_URL}/${creatorDetails.user.image}`}
              />
              <span>{creatorDetails.user.name}</span>
            </div>
          )}
          <div className="flex justify-center items-center gap-2">
            <div className="flex">
              <IoHeart
                onClick={() => handleLikeClick(props.id)}
                style={{ color: isLiked ? "pink" : "#9E9EA7" }}
                size={24}
              />
              <p style={{ color: "#9E9EA7" }}>{likeCount}</p>
            </div>
            <div className="flex gap-1">
              <IoEyeSharp style={{ color: "#9E9EA7" }} size={24} />
              <p style={{ color: "#9E9EA7" }}>{props.views}</p>
            </div>
          </div>
        </div>
      </li>
      <Modal
        show={showModal} // Pass modal visibility state
        onCancel={() => setShowModal(false)} // Handle modal close
        header="Error" // Modal header
        error={modalError} // Pass error message to modal
        footer={
          <React.Fragment>
            <Button inverse onClick={handleModalClick}>
              ok
            </Button>
          </React.Fragment>
        }
      >
        {" "}
        <p>{modalError}.</p>
      </Modal>
    </React.Fragment>
  );
}

export default PlacesItem;
