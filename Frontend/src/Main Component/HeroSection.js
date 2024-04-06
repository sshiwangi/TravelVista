import { useContext } from "react";

import { AuthContext } from "../shared/context/auth-context";

export default function HeroSection() {
  const auth = useContext(AuthContext);

  return (
    <div className="bg-white lg:h-[60vh]">
      <div className="relative isolate px-6 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="mx-auto max-w-2xl py-12 sm:py-20 ">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your Digital Travel Diary
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              TravelVista is a platform for sharing and exploring incredible
              travel destinations around the world.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href={`${auth.isLoggedIn ? "/places" : "/auth"} `}
                className="rounded-md bg-[#ff4d1c] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#ff683ef7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
}
