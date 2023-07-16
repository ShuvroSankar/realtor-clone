import React from "react";
import { useLocation, useNavigate } from "react-router";
export default function Header() {
  const location = useLocation();
  const navigation = useNavigate();
  console.log(location.pathname);
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50 ">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto ">
        <div className="">
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigation("/")}
          />
        </div>
        <div className="">
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-2 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && "text-black border-b-red-500"
              } `}
              onClick={() => navigation("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-2 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offers") && "text-black border-b-red-500"
              } `}
              onClick={() => navigation("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-2 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/sign-in") && "text-black border-b-red-500"
              } `}
              onClick={() => navigation("/sign-in")}
            >
              Sign in
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
