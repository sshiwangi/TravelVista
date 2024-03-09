import React from "react";
import "./UsersList.css";
import UserItem from "./UserItem";
import Card from "../../shared/componets/UIElements/Card";
import usersPageImg from "../../assets/original-c3552a703d42f94e802f94a8e41396b7.png";
import SearchBar from "../../Main Component/SearchBar";

function UsersList(props) {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }
  return (
    <div className="users-list">
      <div className="users-page-img-container">
        <SearchBar />
      </div>
      <div className="flex mt-20 justify-center flex-wrap">
        {props.items.map((user) => {
          return (
            <UserItem
              key={user.id}
              id={user.id}
              image={user.image}
              name={user.name}
              placeCount={user.places.length}
            />
          );
        })}
      </div>
    </div>
  );
}

export default UsersList;
