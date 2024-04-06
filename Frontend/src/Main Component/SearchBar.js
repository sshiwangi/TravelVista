import React, { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { fetchSearchQuery } from "../api";

export default function SearchBar(props) {
  const [query, setQuery] = useState("");
  const [queryData, setQueryData] = useState([]);
  const [error, setError] = useState();

  const handleSearchQueryInput = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    let timeout;
    if (query !== "") {
      timeout = setTimeout(async () => {
        try {
          const searchMatch = await fetchSearchQuery(query);
          setQueryData(searchMatch);
          setError(null);
        } catch (error) {
          setError(error.message);
        }
      }, 500);
    }

    return () => {
      setQueryData([]);
      clearTimeout(timeout);
    };
  }, [query]);

  return (
    <div className={props.styles}>
      <div className="relative rounded-lg h-full ">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500">
            <MdOutlineSearch size={24} />
          </span>
        </div>
        <input
          type="text"
          name="price"
          placeholder="Search users or places"
          id="price"
          className={props.inputStyles}
          value={query}
          onChange={handleSearchQueryInput}
        />
        {/* <div className="absolute inset-y-0 px-4 right-0 flex items-center">
          <button className="p-2 bg-[#ff4d1c] px-4 text-lg text-white rounded-md">
            Search
          </button>
        </div> */}
      </div>
      <div class=" rounded-md mt-2 z-10 w-full divide-y shadow-lg max-h-72 overflow-y-auto bg-white">
        {query !== "" ? (
          queryData && queryData.length > 0 ? (
            queryData.map((result) => (
              <a
                href="/"
                key={result.id}
                className="block text-left p-2 hover:bg-indigo-50"
              >
                {result.name}
              </a>
            ))
          ) : (
            <p className="text-left p-2">No user found</p>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
