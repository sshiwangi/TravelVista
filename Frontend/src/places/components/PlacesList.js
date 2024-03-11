import React from "react";
import "./PlacesList.css";
import Card from "../../shared/componets/UIElements/Card";
import PlacesItem from "./PlacesItem";
import Button from "../../shared/componets/FormElements/Button";
import SearchBar from "../../Main Component/SearchBar";

function PlacesList(props) {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe Create one?</h2>
          <Button to="places/new">Share Place</Button>
        </Card>
      </div>
    );
  }
  return (
    <div className="places-list">
      <div className="flex w-full gap-6 mt-20 justify-center flex-wrap">
        {props.items.map((place) => (
          <PlacesItem
            key={place.id}
            id={place.id}
            image={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            coordinates={place.location}
            onDelete={props.onDeletePlace}
          />
        ))}
      </div>
    </div>
  );
}

export default PlacesList;
