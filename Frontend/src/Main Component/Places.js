import React, { useEffect, useState } from "react";
import { fetchAllPlaces } from "../api";
import PlacesItem from "../places/components/PlacesItem";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";

export default function Places() {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

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
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto flex flex-col items-center max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex flex-col items-center max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Popular Places
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            See what's catching others' eyes.
          </p>
        </div>
        <div className=" mt-10 flex flex-wrap justify-center gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16  ">
          {loadedPlaces?.map((place) => (
            <div className="w-[22rem]">
              <PlacesItem
                key={place.id}
                id={place.id}
                image={place.image}
                title={place.title}
                description={place.description}
                address={place.address}
                creatorId={place.creator}
                coordinates={place.location}
                views={place.views}
                likes={place.likes}
                // onDelete={props.onDeletePlace}
              />
            </div>
          ))}
        </div>
        <div
          onClick={() => navigate("/places")}
          className="mt-10 rounded-full border-black border-[1px] py-3 px-6"
        >
          Browse more places
        </div>
      </div>
    </div>
  );
}
