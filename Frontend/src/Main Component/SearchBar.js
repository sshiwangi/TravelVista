import React from "react";
import { MdOutlineSearch } from "react-icons/md";

export default function SearchBar() {
  return (
    <div className="absolute bottom-0 w-3/4 md:w-1/2 shadow-lg h-[75px]">
      <div className="relative mt-2 rounded-md h-full">
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
          className="block w-full h-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        />
        <div className="absolute inset-y-0 px-4 right-0 flex items-center">
          <button className="p-2 bg-[#ff4d1c] px-4 text-lg text-white rounded-md">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
