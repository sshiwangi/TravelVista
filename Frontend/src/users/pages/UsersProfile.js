import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useAuth } from "../../shared/hooks/auth-hook";
import "./usersProfile.css";
import PlacesList from "../../places/components/PlacesList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/componets/UIElements/LoadingSpinner";
import { useParams } from "react-router-dom";
import PlaceList from "../../places/components/PlaceList";

function UsersProfile() {
  const auth = useContext(AuthContext);
  const { token, login, logout, userProfile, fetchUserProfile } = useAuth();
  const [userPlaces, setUserPlaces] = useState();
  const [likedPlaces, setLikedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // const [selectedItem, setSelectedItem] = useState("places");
  const { userId } = useParams();
  const userImage = userProfile?.user?.image;
  const userName = userProfile?.user?.name;
  const [activeTab, setActiveTab] = useState("myPlaces");

  useEffect(() => {
    fetchUserProfile(userId);
  }, [userId, fetchUserProfile]);

  useEffect(() => {
    const fetchPlaceDetails = async (placeIds) => {
      try {
        const placesData = await Promise.all(
          placeIds.map(async (placeId) => {
            const placeResponse = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
            );
            return placeResponse.place;
          })
        );
        return placesData;
        console.log(placesData);
      } catch (err) {
        console.log(err);
        return [];
      }
    };

    const fetchUsersPlaces = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/users/${userId}`
        );
        console.log(responseData);
        if (responseData.user.places) {
          const userPlacesData = await fetchPlaceDetails(
            responseData.user.places
          );
          setUserPlaces(userPlacesData);
          // console.log(loadedPlacesData);
        }
        if (responseData.user.likedPlaces) {
          const likedPlacesData = await fetchPlaceDetails(
            responseData.user.likedPlaces
          );
          setLikedPlaces(likedPlacesData);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsersPlaces();
  }, [sendRequest]);

  //   const activeComponent = () => {
  //     switch (selectedItem) {
  //       case "places":
  //         return <PlacesList />;
  //       case "blogs":
  //         return <BlogsList />;
  //       case "collections":
  //         return <CollectionsComponent />;
  //       default:
  //         return null;
  //     }
  //   };
  console.log("user Places", userPlaces);
  console.log("liked places", likedPlaces);
  console.log(userId);
  return (
    <section className="flex flex-col gap-10">
      <div className="flex justify-center items-center">
        {userImage && (
          <div className="items-center gap-4 flex flex-col">
            <img
              className="h-[150px] w-[150px] rounded-full"
              src={`${process.env.REACT_APP_ASSET_URL}/${userImage}`}
            />
            <p className="text-2xl font-bold">{userName}</p>
          </div>
        )}
      </div>
      <div className="py-5 border-b-2">
        <ul className="flex text-xl gap-10 font-medium">
          <li
            className={`p-2 hover:bg-[#ff4d1c] active:bg-[#ff4d1c] rounded-md hover:text-white cursor-pointer ${
              activeTab === "myPlaces" && "bg-[#ff4d1c] text-white"
            }`}
            onClick={() => setActiveTab("myPlaces")}
          >
            Places
          </li>
          <li
            className={`p-2 hover:bg-[#ff4d1c] active:bg-[#ff4d1c] rounded-md hover:text-white cursor-pointer ${
              activeTab === "likedPlaces" && "bg-[#ff4d1c] text-white"
            }`}
            onClick={() => setActiveTab("likedPlaces")}
          >
            Liked Places
          </li>
        </ul>
      </div>
      <div>
        {isLoading && (
          <div className="flex justify-center items-center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && userPlaces && activeTab === "myPlaces" && (
          <PlacesList items={userPlaces} />
        )}

        {!isLoading && likedPlaces && activeTab === "likedPlaces" && (
          <PlacesList items={likedPlaces} />
        )}
      </div>
    </section>
  );
}

export default UsersProfile;
