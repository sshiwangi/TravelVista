import React from "react";
import "./UserItem.css";
import { Link } from "react-router-dom";
import Avatar from "../../shared/componets/UIElements/Avatar";
import Card from "../../shared/componets/UIElements/Card";

function UserItem(props) {
  return (
    <div className="user-item">
      <Card className="user-item__content">
        <Link to={`${props.id}/places`}>
          <div className="user-item__image">
            <Avatar
              image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
              alt={props.name}
            />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </div>
  );
}

export default UserItem;
