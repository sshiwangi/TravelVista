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
        <Card className="flex flex-col gap-4 font-medium text-xl">
          <h2>No places found. Maybe Create one?</h2>
          <Button className="w-1/2" to="/places/new">
            Share Place
          </Button>
        </Card>
      </div>
    );
  }
  return (
    <div className="places-list">
      <div className="flex w-full gap-6 mt-20 justify-center flex-wrap">
        {props.items.map((place) => (
          <div className="w-[22rem]">
            <PlacesItem
              key={place._id}
              id={place._id}
              image={place.image}
              title={place.title}
              description={place.description}
              address={place.address}
              creatorId={place.creator}
              coordinates={place.location}
              views={place.views}
              likes={place.likes}
              onDelete={props.onDeletePlace}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesList;
