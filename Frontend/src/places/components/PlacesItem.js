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

function PlacesItem(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [creatorDetails, setCreatorDetails] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.creatorId) {
      return;
    }
    fetchCreatorDetails();
  }, [sendRequest, props.creatorId]);

  const fetchCreatorDetails = async () => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/users/${props.creatorId}`
      );
      console.log(responseData);
      setCreatorDetails(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <li className="places-item">
        <Link to={`/places/placeDetails/${props.id}`}>
          <Card className="places-item__content">
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="w-[16rem] rounded-md">
              <img
                className="w-full h-[16rem] object-cover rounded-md"
                src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
                alt={props.title}
              />
            </div>
            <div className="places-item__info">
              <h2>{props.title}</h2>
              <div className="flex items-center gap-2">
                <FaRegHeart size={24} />
                <IoBookmarkOutline size={24} />
              </div>
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
        </Link>
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
      </li>
    </React.Fragment>
  );
}

export default PlacesItem;
